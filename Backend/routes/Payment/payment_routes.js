const express=require("express");
const payment=require( '../../controllers/Payment/payment_controller');
const router = express.Router();

router.post('/makePayment', payment.insertPayment);
router.post('/getPaymentClient', payment.fetchPaymentsClient);
router.get('/GetAllbyAdmin', payment.fetchall);
router.post('/updatePayment', payment.updateVerifyStatus);

module.exports=router;