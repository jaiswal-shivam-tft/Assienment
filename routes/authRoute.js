const express = require('express');

const joivalidation = require('../validation/authValidation');
const router = express.Router();

const authController = require('../controllers/authController');
const SortByName = require('../Aggregate/sortByName');
const phoneService = require('../services/phoneServices');
const emailService = require('../services/emailServices');
const resetPasswordService = require('../services/resetPasswordServices');
router.post('/signUp', joivalidation.signUpValidation, authController.signUp);
router.post('/logIn', joivalidation.loginValidation, authController.logIn);

//phoneService.
router.post('/sendOtpCode', phoneService.sendOtpByNumber);
router.post('/verifyOtp', phoneService.verifyOtpByPhone);
//for mail Service

router.post('/send', emailService.SendUrlByEmail);
router.post('/verify-email', emailService.emailVerifyByUrl);

//ResetPassword help of mail
router.post('/forgetPassword-email', resetPasswordService.forgetPassword);
router.patch('/resetPassword-email', resetPasswordService.resetPassword);
////////////////////////////////////////////////////////////////////////
router.get('/getUserData', SortByName.getUserData);

module.exports = router;
