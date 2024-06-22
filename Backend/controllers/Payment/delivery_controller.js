const delivery =require("../../models/Payment/delivery") ;

exports.insertDelivery = async (req, res) => {
  try {
  const data = req.body;
  const prefix = "QTPX__";
  const suffix = Date.now().toString();
  const TrackingNumber = prefix + suffix;

  let city = "";
  let state = "";
  let zipCode = "";
  let country = "";

  if (data.method === "Delivery") {
    city = data.city;
    state = data.state;
    zipCode = data.zipCode;
    country = data.country;
  } else if (data.method !== "Delivery") {
    city = "N/A";
    state = "N/A";
    zipCode = "N/A";
    country = "N/A";
  }

  const newForm = new delivery({
    Tracking_Number: TrackingNumber,
    OID: data.OID,
    UID: data.UID,
    FullName: data.firstName + " " + data.lastName,
    Address: data.address,
    Contact_No: data.contactNo1,
    Email: data.email,
    City: city,
    State: state,
    ZipCode: zipCode,
    Country: country,
    Status: "Order Placed",
  });

  const newRecord = await newForm.save();
  if (newRecord) {
    res.status(201).json({
      message: "Delivery Addedd..!",
      payload: newRecord,
    });
  } else {
    res.status(400).json({
      message: "Somthing Went Wrong..!",
    });
  }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.statusChange = async (req, res) => {
  try {
    const data = req.body;
    const Tracking_Number = data.Tracking_Number;

    const updateStatus = {
      Status: data.Status,
    };

    const update = await delivery.findOneAndUpdate(
      {
        Tracking_Number: Tracking_Number,
      },
      updateStatus,
      { new: true }
    );

    if (update) {
      const refresh = await delivery.find();
      if (refresh) {
        res.status(201).json({
          message: "update Success..!",
          payload: refresh,
        });
      } else {
        res.status(404).json({
          message: "refresh Failed..!",
        });
      }
    } else {
      res.status(400).json({
        message: "Update Failed..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.fetchDeliveryClient = async (req, res) => {
  try {
    const data = req.body;
    const UID = data.UID;
    const deliveries = await delivery.find({ UID });
    if (deliveries) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: deliveries,
      });
    } else {
      res.status(404).json({
        message: "No deliveries found for user ID " + UID,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.fetchall = async (req, res) => {
  try {
    const deliveries = await delivery.find();
    if (deliveries) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: deliveries,
      });
    } else {
      res.status(404).json({
        message: "No deliveries found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.DeleteDelivery = async (req, res) => {
  try {
    const data = req.body;
    const Tracking_Number = data.Tracking_Number;

    const deleteDelivery = await delivery.findOneAndDelete({ Tracking_Number });
    if (deleteDelivery) {
      const refresh = await delivery.find();
      if (refresh) {
        res.status(200).json({
          message: "Deleted..!",
          payload: refresh,
        });
      } else {
        res.status(400).json({
          message: "not found..!",
        });
      }
    } else {
      res.status(400).json({
        message: "Delete failed..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};
