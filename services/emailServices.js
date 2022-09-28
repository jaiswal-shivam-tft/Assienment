require('dotenv').config({ path: 'config.env' });
const nodemailer = require('nodemailer');
const otpcode = require('../helper/otp1');
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
const SendUrlByEmail = async function (req, res, next) {
  try {
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
      subject: 'Otp for verification mail is:(valid for 10 minute) ',
      text: ' your  verification email link : ' + link,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).send({
        message: 'UrlwithOtp is Send Successfuly',
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const emailVerifyByUrl = (req, res, next) => {
  memcached.get('user', function (err, data) {
    if (data.otp == req.body.otp && data.email == req.body.email) {
      res.status(200).send({
        message: 'Email Varification Successfull!!',
      });
    } else {
      res.status(401).send({
        message:
          'Email Varification UnSuccessfull You Enter the wrong Phone or Otp',
      });
    }
  });
};
////////////////////////////////

module.exports = {
  SendUrlByEmail,
  emailVerifyByUrl,
};
