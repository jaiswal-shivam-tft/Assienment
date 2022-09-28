const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const premium = require('../middleware/premium');
const userController = require('../controllers/userController');
// const otpAuth = require('../services/otpServices');
router.get('/docterFindByID/:id', auth, userController.docterFindByID);
router.get('/allDocterFind', premium.ristriction, userController.allDocterFind);
// router.post('/sendOtpCode', otpAuth.sendOtpCode);
// router.post('/verifyOtp', otpAuth.verifyOtp);
router.patch(
  '/updateProfile',
  auth,
  upload.uploadProfilePhoto,
  userController.updateProfile
);

router.get('/logOut', userController.logOut);
router.post('/setpremium', premium.ristriction);
module.exports = router;
