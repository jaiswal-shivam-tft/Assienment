const Memcached = require('memcached');
const otpcode = require('../helper/otp1');
const memcached = new Memcached();

require('dotenv').config({ path: 'config.env' });
// TWILIO_ACCOUNT_SID
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

// send OTP For varify
const sendOtpByNumber = (req, res, next) => {
  //   const otp = Math.floor(Math.random() * Math.pow(10, 4));
  //   const otp = Math.floor(Math.random() * 10000 + 1);
  const z = new otpcode();
  const otp = z.getOtp();

  memcached.set(
    'user',
    { otp, phonenumber: req.body.phone },
    10000,
    function (err) {
      if (err) throw new err();
    }
  );

  client.messages
    .create({
      body: `OTP Send for varification ${otp}`,
      messagingServiceSid: process.env.SERVICE_ID,
      from: process.env.from,
      to: req.body.phone,
    })
    .then((data) => {
      res
        .status(200)
        .json({ message: 'Otp  send successfully please check your phone  ' });
    });
};

//Varify OTP
const verifyOtpByPhone = (req, res, next) => {
  memcached.get('user', function (err, data) {
    if (data.otp == req.body.otp && data.phonenumber == req.body.phone) {
      res.status(200).json({
        message: 'OTP Varification Successfull!!',
      });
    } else {
      res.status(401).json({
        message: 'OTP Varification UnSuccessfull!!',
      });
    }
  });
};

module.exports = {
  sendOtpByNumber,
  verifyOtpByPhone,
};
