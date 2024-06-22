const attendance = require("../../models/Employee/attendanceSchema");
const moment = require("moment");

//const BASE_URL = process.env.BASE_URL


// Add Attendance
exports.attendancepost = async (req, res) => {

    try {
        const { employeeID, intime, outtime, workingtime, attdate } = req.body;

        // Check if all required fields are provided
        if (!employeeID || !intime ) {
            return res.status(400).json({ message: "Needed Inputs are required" });
        }

        // Create a new Work History instance
        const attendanceData = new attendance({
            employeeID, 
            intime, 
            outtime, 
            workingtime,
            attdate,
            datecreated: moment().format("YYYY-MM-DD hh:mm:ss"),
        });

        await attendanceData.save();
        res.status(200).json(attendanceData);

    } catch (error) {
        console.error("Error in attendancepost:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// attendencesget all
exports.attendanceget = async (req, res) => {
    try {
    const search = req.query.search || '';
    const datecreated = req.query.datecreated || null;
    const sort = req.query.sort || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 5;


    const query = {};

        // Add search query for employeeID filtering
        if (search) {
            query.employeeID = { $regex: search, $options: 'i' };
        }

        // Add datecreated query for filtering
        if (datecreated) {
            query.datecreated = { $gte: new Date(datecreated), $lt: new Date(new Date(datecreated).setDate(new Date(datecreated).getDate() + 1)) };
        }
      
        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await attendance.countDocuments(query);

        const attendancesdata = await attendance.find(query)
        .sort({datecreated:sort == "new" ? -1 : 1})
        .limit(ITEM_PER_PAGE)
        .skip(skip);

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            attendancesdata
        })


    } catch (error) {
        res.status(401).json(error)
    }
}


/*
// get attendance all(without filtering and)
exports.attendanceeget = async (req, res) => {
   
try {
    const attendanceesdata = await attendance.find({});
    res.status(200).json({
        attendanceesdata
    });
    } catch (error) {
        res.status(401).json(error)
    }
}
*/


// single attendance get
exports.singleattendanceget = async (req, res) => {

    const { id } = req.params;

    try {
        const attendancedata = await attendance.findOne({ _id: id });
        res.status(200).json(attendancedata)
    } catch (error) {
        res.status(401).json(error)
    }
}


// attendance edit
exports.attendanceedit = async (req, res) => {
    const { id } = req.params;
    const { employeeID, intime, outtime, workingtime } = req.body;
    

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateattendance = await attendance.findByIdAndUpdate({ _id: id }, {
            employeeID, intime, outtime, workingtime, dateUpdated
        }, {
            new: true
        });

        await updateattendance.save();
        res.status(200).json(updateattendance);
    } catch (error) {
        res.status(401).json(error)
    }
}


// delete attendance
exports.attendancedelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletattendance = await attendance.findByIdAndDelete({ _id: id });
        res.status(200).json(deletattendance);
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getAggregatedAttendance = async (req, res) => {
    try {
        // Calculate the start date (5 days ago)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 4); // Subtract 4 days to get 5 days ago

        // Calculate the end date (today)
        const endDate = new Date();

        // Construct the query to fetch attendance data for the last 5 days
        const query = {
            attdate: { $gte: startDate, $lte: endDate } // Filter by attdate within the last 5 days
        };

        // Aggregate attendance data by date
        const aggregatedAttendance = await attendance.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$attdate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by date in ascending order
        ]);

        // Extract the dates and counts from the aggregatedAttendance data
        const dates = aggregatedAttendance.map(item => item._id);
        const counts = aggregatedAttendance.map(item => item.count);

        // Send the dates and counts data to the frontend
        res.status(200).json({ dates, counts });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching aggregated attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


