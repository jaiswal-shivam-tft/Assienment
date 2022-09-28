require('dotenv').config({ path: 'config.env' });
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signUp in the aplication
module.exports.signUp = catchAsync(async (req, res, next) => {
  try {
    // console.log(req.body
    // console.log(req.body);
    const { firstName, lastName, phone, email, password, photo, role } =
      req.body;
    // console.log(req.body);
    if (!(email && password && phone && firstName && lastName)) {
      res.status(400).send('All input is required');
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    encryptedUserPassword = await bcrypt.hash(password, 10);
    // role = role.enumvalue;
    // Create user in our database

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      role: role,
      photo: photo,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });
    // const user = await User.create({req.body})
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '5h',
      }
    );
    // save user token

    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});
// login in the aplication
module.exports.logIn = catchAsync(async (req, res, next) => {
  try {
    const { phone, email, password } = req.body;

    // Validate user input
    if (!(email || phone) || !password) {
      res.status(400).send('All input is required');
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phone });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, phone },
        process.env.TOKEN_KEY,
        {
          expiresIn: '5h',
        }
      );

      // save user token
      user.token = token;
      //store in cokie
      res.cookie('nToken', token, {
        maxAge: process.env.MAX_AGE,
        httpOnly: true,
      });

      return res.status(200).json(user);
    }
    return res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
});

////////////////////////////////////////////////////////////////
// module.exports.sortData = async function (req, res, next) {
//   try {
//     User.aggregate([
//       { $sort: { name: -1 } },
//       { $project: { _id: 0, name: 1 } },
//     ]);
//     // .then(response => {
//     //     res.json({
//     //         response
//     //     })
//     // })
//   } catch (error) {
//     res.json({
//       message: 'An error occured!',
//     });
//   }
// };

// // module.exports = {
// //   sortData,
// // };
