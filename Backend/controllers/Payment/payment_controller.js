const payment =require( "../../models/Payment/payment");

exports.insertPayment = async (req, res) => {
  // try {
    const data = req.body;
    let fullName = "";
    let contactNo = "";
    let email = "";

    if (data.method === "Delivery" && data.saveAddress === true) {
      fullName = data.firstName + " " + data.lastName;
      contactNo = data.contactNo1;
      email = data.email;
    } else if (data.method === "Delivery" && data.saveAddress === false) {
      fullName = data.firstName2 + " " + data.lastName2;
      contactNo = data.contactNo2;
      email = data.email2;
    } else if (data.method !== "Delivery") {
      fullName = data.firstName + " " + data.lastName;
      contactNo = data.contactNo1;
      email = data.email;
    }

    let CardNumber = "";
    let CVV = "";
    let CardName = "";
    let Expire = "";
    let Transaction_Refrence = "";

    if (data.paymentType === "creditCard") {
      CardNumber = "xxxx xxxx xxxx " + data.cardNumber.slice(-4);
      CVV = data.CVV;
      CardName = data.CardName;
      Expire = data.Expire;
      Transaction_Refrence = "N/A";
    } else if (data.paymentType === "bankTransfer") {
      CardNumber = "N/A";
      CVV = "N/A";
      CardName = "N/A";
      Expire = "N/A";
      Transaction_Refrence = data.reference;
    }

    //create uniquer PID
    const prefix = "PID";
    const suffix = Date.now().toString().slice(-6);
    const PID = prefix + "_" + suffix;

    const newPayment = new payment({
      PID: PID,
      OID: data.OID,
      UID: data.UID,
      PaymentType: data.paymentType,
      FullName: fullName,
      Contact_No: contactNo,
      Email: email,
      CardNumber: CardNumber,
      CVV: CVV,
      CardName: CardName,
      Expire: Expire,
      Transaction_Refrence: Transaction_Refrence,
      Status: "Unverified",
    });

    const newRecord = await newPayment.save();
    if (newRecord) {
      res.status(201).json({
        message: "Payment Sucessfull..!",
        payload: newRecord,
      });
    } else {
      res.status(400).json({
        message: "Somthing Went Wrong..!",
      });
    }
  // } catch (error) {
  //   res.status(500).json({
  //     message: "Somthing Went Wrong..!",
  //     error: error,
  //   });
  // }
};

exports.fetchPaymentsClient = async (req, res) => {
  try {
    const data = req.body;
    const UID = data.UID;
    const payments = await payment.find({ UID });
    if (payments) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: payments,
      });
    } else {
      res.status(404).json({
        message: "No payments found for user ID " + UID,
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
    const payments = await payment.find();
    if (payments) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: payments,
      });
    } else {
      res.status(404).json({
        message: "No payments found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.updateVerifyStatus = async (req, res) => {
  try {
    const data = req.body;
    const PID = data.PID;

    const updateStatus = {
      Status: data.Status,
    };

    const update = await payment.findOneAndUpdate({ PID: PID }, updateStatus, {
      new: true,
    });
    if (update) {
      const refresh = await payment.find()
      if(refresh){
        res.status(201).json({
          message: "update Success..!",
          payload: refresh,
        });
      }else{
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
