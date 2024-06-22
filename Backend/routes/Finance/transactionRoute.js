const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction
} = require("../../controllers/Finance/transactionController");

//router object
const router = express.Router();

//routes
//add transection POST MEthod
router.post("/add-transaction", addTransaction);

//edit transection POST MEthod
router.put("/edit-transaction", editTransaction);

//delete transection POST MEthod
router.delete("/delete-transaction", deleteTransaction);

//get transections
router.get("/get-transaction", getAllTransaction);

module.exports = router;