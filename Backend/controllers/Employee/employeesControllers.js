const employees = require("../../models/Employee/employeesSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
//const BASE_URL = process.env.BASE_URL


// register employee
exports.employeepost = async (req, res) => {


    const file = req.file.filename;
    const { empfname, emplname, empemail, empmobile, empaddress, empgender, empType, status, salaryPerDay, startDate, endDate } = req.body;

    if (!empfname || !emplname || !empemail || !empmobile || !empaddress || !empgender || !empType || !status || !salaryPerDay || !startDate || !endDate || !file) {
        res.status(401).json("All Inputs are required")
    }

    try {
        const preemployee = await employees.findOne({ empemail: empemail });

        if (preemployee) {
            res.status(401).json("This employee already exist in our databse")
        } else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const employeeData = new employees({
                empfname, emplname, empemail, empmobile, empaddress, empgender, empType, status, salaryPerDay, startDate, endDate, profile: file, datecreated
            });
            await employeeData.save();
            res.status(200).json(employeeData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }


};


// employeesget
exports.employeeget = async (req, res) => {

    const search = req.query.search || ""
    const empgender = req.query.empgender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 5;

    const query = {
        empfname: { $regex: search, $options: "i" }
    }

    if (empgender !== "All") {
        query.empgender = empgender
    }

    if (status !== "All") {
        query.status = status
    }

    
    try {

        
        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await employees.countDocuments(query);

        const employeesdata = await employees.find(query)
        .sort({datecreated:sort == "new" ? -1 : 1})
        .limit(ITEM_PER_PAGE)
        .skip(skip);

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            employeesdata
        })


    } catch (error) {
        res.status(401).json(error)
    }
}


// single employee get
exports.singleemployeeget = async (req, res) => {

    const { id } = req.params;

    try {
        const employeedata = await employees.findOne({ _id: id });
        res.status(200).json(employeedata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// employee edit
exports.employeeedit = async (req, res) => {
    const { id } = req.params;
    const { empfname, emplname, empemail, empmobile, empaddress, empgender, empType, status, salaryPerDay, startDate, endDate, emp_profile } = req.body;
    const file = req.file ? req.file.filename : emp_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateemployee = await employees.findByIdAndUpdate({ _id: id }, {
            empfname, emplname, empemail, empmobile, empaddress, empgender, empType, status, salaryPerDay, startDate, endDate, profile: file, dateUpdated
        }, {
            new: true
        });

        await updateemployee.save();
        res.status(200).json(updateemployee);
    } catch (error) {
        res.status(401).json(error)
    }
}


// delete employee
exports.employeedelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletemployee = await employees.findByIdAndDelete({ _id: id });
        res.status(200).json(deletemployee);
    } catch (error) {
        res.status(401).json(error)
    }
}


// change status
exports.employeestatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const employeestatusupdate = await employees.findByIdAndUpdate({ _id: id }, { status: data }, { new: true });
        res.status(200).json(employeestatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}


// export employee
exports.employeeExport = async (req, res) => {
    try {
        const employeesdata = await employees.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export");
            }
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/employees.csv"
        );


        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            /*
            res.json({
                downloadUrl: `${BASE_URL}/files/export/employees.csv`,
            });
            */
           res.json({
            downloadUrl:`http://localhost:5000/files/export/employees.csv`
           })
        });


        
        if (employeesdata.length > 0) {
            employeesdata.map((employee) => {
                csvStream.write({
                    FirstName: employee.empfname ? employee.empfname : "-",
                    LastName: employee.emplname ? employee.emplname : "-",
                    Email: employee.empemail ? employee.empemail : "-",
                    Phone: employee.empmobile ? employee.empmobile : "-",
                    Address: employee.empaddress ? employee.empaddress : "-",
                    Gender: employee.empgender ? employee.empgender : "-",
                    EmployeeType: employee.empType ? employee.empType : "-",
                    Status: employee.status ? employee.status : "-",
                    Profile: employee.profile ? employee.profile : "-",
                    SalaryPerDay: employee.salaryPerDay ? employee.salaryPerDay : "-",
                    StartDate: employee.startDate ? employee.startDate : "-",
                    EndDate: employee.endDate ? employee.endDate : "-",
                    DateCreated: employee.datecreated ? employee.datecreated : "-",
                    DateUpdated: employee.dateUpdated ? employee.dateUpdated : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }

    
}



exports.employeeidget = async (req, res) => {
    try {
      // Fetch all employees from the database
      const employeesData = await employees.find({}, '_id');
      const employeeIds = employeesData.map(emp => emp._id);
      res.json({ employeeIds });
    } catch (error) {
      console.error('Error fetching employee IDs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.employeeCount = async (req, res) => {
    try {
        // Fetch the count of all employees from the database
        const count = await employees.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


