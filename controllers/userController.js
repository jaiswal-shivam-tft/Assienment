require('dotenv').config({ path: 'config.env' });
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const User = require('../model/userModel');

// // data find by id
module.exports.docterFindByID = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
    if (!user) {
      // return next(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all docter
module.exports.allDocterFind = catchAsync(async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// updated the profile

module.exports.updateProfile = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      { $set: { photo: req.file.path } },
      { new: true }
    );

    if (!user) {
      res.status(404).send({
        message: `Cannot update model with id=${id}. Maybe model was not found!`,
      });
    } else res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//logout
module.exports.logOut = catchAsync(async (req, res, next) => {
  // clear the login cookie
  res.clearCookie('ntoken');
  res.status(200).json({ status: 'success' });
});
