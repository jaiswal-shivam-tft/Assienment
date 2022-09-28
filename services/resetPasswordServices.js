require('dotenv').config({ path: 'config.env' });
const otpcode = require('../helper/otp1');
const nodemailer = require('nodemailer');
const Memcached = require('memcached');
const memcached = new Memcached();

let transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  secure: true,
  service: 'Gmail',
  auth: {
    user: process.env.USER_ID,
    pass: process.env.PASSWORD,
  },
});
var host, email, link;
const forgetPassword = async function (req, res, next) {
  try {
    // const otp = Math.floor(Math.random() * 10000 + 1);
    const z = new otpcode();
    const otp = z.getOtp();

    memcached.set(
      'user',
      { otp, email: req.body.email },
      10000,
      function (err) {
        if (err) throw new err();
      }
    );

    host = req.get('host');
    email = req.body.email;
    link =
      'http://' +
      req.get('host') +
      '/verify-email?email=' +
      email +
      '&code=' +
      otp; // send mail with defined transport object
    var mailOptions = {
      to: req.body.email,
      subject: 'Url for resetPassword is:(valid for 10 minute) ',
      text: ' your resetPassword  link : ' + link,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).send({
        message: 'Url  is send  Successfulry for resetPassword ',
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = (req, res, next) => {
  let newPassword = req.body.newPassword;
  memcached.get('user', function (err, data) {
    if (
      data.otp == req.body.otp &&
      newPassword &&
      data.email == req.body.email
    ) {
      res.status(200).send({
        message: 'new Password create Successfully',
      });
    } else {
      res.status(401).send({
        message: 'mail or otp incorrect please check your mail',
      });
    }
  });
};

module.exports = {
  forgetPassword,
  resetPassword,
};
