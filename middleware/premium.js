//=====================primimum=======================
const catchAsync = require('../utils/catchAsync');
const User = require('../model/userModel');
const Memcached = require('memcached');
const memcached = new Memcached();
let id = User._id;
let limit = 10;
const ristriction = catchAsync(async (req, res, next) => {
  // console.log(_id);
  memcached.set(`${id}`, limit, function (err) {
    if (err) {
      throw new err();
    } else {
      res.status(200).json({ message: 'your limit is set success' });
    }
  });
  // } catch (err) {
  //   res.status(400).json({ message: 'error.message' });
});

// ///
// const ristriction = catchAsync(async (req, res, next) => {
//   // console.log(_id);
//   memcached.set(`${id}`, limit, function (err) {
//     if (err) {
//       throw new err();
//     } else {
//       res.status(200).json({ message: 'your limit is set success' });
//     }
//   });
// } catch (err) {
//   res.status(400).json({ message: 'error.message' });
// });
module.exports = {
  ristriction,
};
//     // let userId;
//     const id = user.id;
//     // User.findOne({ _id: id }, function (err, user) {
//     //   if (err) throw new err();
//     //   const user_id = user._id;
//     //   console.log(user_id);
//     // });
//     let limit = 10;
//     memcached.set(`${id}`, limit, function (err) {
//       if (err) throw new err();
//     });
//     memcached.get(`${id}`, function (err, data) {
//       let count = 1;
//       if (limit) {
//         // console.log(limit);
//         // let count = 0;

//         // count = limit;

//         res.status(200).send({
//           count: limit,
//           message: 'hit the Api Succesfull',
//         });
//         limit -= count;
//         memcached.set('id', limit, function (err) {
//           if (err) throw new err();
//         });
//         console.log(limit);
//         // memcached.set(`${id}`, limit - 1, function (err) {
//         //   if (err) throw new err();
//         // });
//         // memcached.set(`${id}`, limit, function (err) {
//         //   if (err) throw new err();
//         // });
//         console.log(limit);
//       } else {
//         res.status(401).send({
//           message: 'hiting is over',
//         });
//         //
//       }
//       // console.log(limit);
//     });
//     // memcached.set(`${id}`, limit, function (err) {
//     //   if (err) throw new err();
//     // });
//     // console.log(limit);
//     //   const user = await User.findById(req.params.id);
//     //   res.json(user);
//     //   if (!user) {
//     //     // return next(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
//     //     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     //   }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// // const ristriction = catchAsync(async (req, res, next) => {
// //   let limit = 10;
// //   memcached.set('user', limit, function (err) {
// //     if (err) throw new err();
// //   });
// //   memcached.get('user', function (err, data) {
// //     let count = 0;

// //     if (limit <= 10) {
// //       //   for (let i = 1; i < limit; i++) {
// //       count++;
// //       res.status(200).send({
// //         count: count,
// //         message: 'hit the Api Succesfull',
// //       });
// //       memcached.set('user', limit - 1, function (err) {
// //         if (err) throw new err();
// //       });
// //       // }
// //     } else if (limit > 10) {
// //       res.status(401).send({
// //         message: 'hiting is over',
// //       });
// //     }
// //   });
// // });
// module.exports = {
//   ristriction,
// };
// // // memcached.set(
// // //   'user',
// // //   { otp, phonenumber: req.body.phone },
// // //   10000,
// // //   function (err) {
// // //     if (err) throw new err();
// // //   }
// // // );
