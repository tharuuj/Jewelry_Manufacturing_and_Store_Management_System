const { check,validationResult } = require('express-validator');

exports.validateSignupRequest=[
    check('name')
    .notEmpty()
    .withMessage('name is required'),
    check('DOB')
    .notEmpty()
    .withMessage('DOB is required'),
    check('address')
    .notEmpty()
    .withMessage('address is required'),
    check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('username')
    .notEmpty()
    .withMessage('username is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 character long')
];

exports.validateSigninRequest=[
    
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated=(req,res,next)=>{
const errors=validationResult(req);
if(errors.array().length>0){
    return res.status(400).json({error:errors.array()[0].msg})
}
next();
}