const transactionModel = require("../../models/Finance/transactionModel");
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate,type } = req.body;
    let dateFilter = {};

    if (frequency !== 'custom') {
      dateFilter.date = {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      };
    } else {
      dateFilter.date = {
        $gte: moment(selectedDate[0]).startOf('day').toDate(),
        $lte: moment(selectedDate[1]).endOf('day').toDate(),
      };
    }

    const transactions = await transactionModel.find({
      ...dateFilter,
      userid: req.body.userid,
      ...(type !=='all' &&{type})
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction=async(req,res)=>{
try{

    await transactionModel.findOneAndDelete({_id:req.body.transactionId})
    res.status(200).send('Transaction deleted')
}catch(error)
{

    console.log(error)
    res.status(500).json(error)


}


};


const editTransaction=async(req,res)=>{
try{

    await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
    res.status(200).send('edit successfully')


}catch(error){

console.log(error)
res.status(500).json(error)
}

}

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction,editTransaction,deleteTransaction};
