const workhistory = require("../../models/Employee/workHistorySchema");
const moment = require("moment");

//const BASE_URL = process.env.BASE_URL


// Work History Registration
exports.workhistorypost = async (req, res) => {

    try {
        const { employeesId, itemdes, workstartdate, workestimateddate, workprice, workenddate, workstatus } = req.body;

        // Check if all required fields are provided
        if (!employeesId || !itemdes || !workstartdate || !workestimateddate || !workprice) {
            return res.status(400).json({ message: "Needed Inputs are required" });
        }

        // Create a new Work History instance
        const workhistoryData = new workhistory({
            employeesId,
            itemdes,            
            workstartdate,
            workestimateddate,
            workprice,
            workenddate,
            workstatus,
            datecreated: moment().format("YYYY-MM-DD hh:mm:ss"),
        });

        await workhistoryData.save();
        res.status(200).json(workhistoryData);

    } catch (error) {
        console.error("Error in workhistorypost:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// workhistory get
exports.workhistoryget = async (req, res) => {

    const search = req.query.search || ""
    const workstatus = req.query.workstatus || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 5;

    const query = {
        itemdes: { $regex: search, $options: "i" }
    }
    
    if (workstatus !== "All") {
        query.workstatus = workstatus
    }


    try {


        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await workhistory.countDocuments(query);

        const workhistoriesdata = await workhistory.find(query)
            .sort({datecreated:sort == "new" ? -1 : 1})
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count / ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination: {
                count, pageCount
            },
            workhistoriesdata
        })


    } catch (error) {
        res.status(401).json(error)
    }
}


// change work status
exports.workhistorystatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const workhistorystatusupdate = await workhistory.findByIdAndUpdate({ _id: id }, { workstatus: data }, { new: true });
        res.status(200).json(workhistorystatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}


// single work history get
exports.singleworkhistoryget = async (req, res) => {

    const { id } = req.params;

    try {
        const workhistorydata = await workhistory.findOne({ _id: id });
        res.status(200).json(workhistorydata)
    } catch (error) {
        res.status(401).json(error)
    }
}


// workhistory edit
exports.workhistoryedit = async (req, res) => {
    const { id } = req.params;
    const { employeesId, itemdes, workstartdate, workestimateddate, workprice, workenddate, workstatus } = req.body;
    
    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateworkhistory = await workhistory.findByIdAndUpdate({ _id: id }, {
            employeesId, itemdes, workstartdate, workestimateddate, workprice, workenddate, workstatus, dateUpdated
        }, {
            new: true
        });

        await updateworkhistory.save();
        res.status(200).json(updateworkhistory);
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete work history
exports.workhistorydelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteworkhistory = await workhistory.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteworkhistory);
    } catch (error) {
        res.status(401).json(error)
    }
}

