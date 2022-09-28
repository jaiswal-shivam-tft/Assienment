const User = require('../model/userModel');
module.exports.getUserData = (req, res, next) => {
  // { $match : { author : "dave" } }
  //   User.aggregate([{ $sort: { name: -1 } }, { $match: { name: 'Dr shivam' } }])
  //   User.aggregate([{ $sort: { name: -1 } }, { $match: { name: 'Dr shivam' } }])
  //   User.aggregate.count();
  //   User.aggregate([{ $group: { name: 1, phone: 1, email: 1 } }])
  //   User.aggregate([
  //     {
  //       $group: {
  //         _id: '$name',
  //         // count: { $count: {} },
  //       },
  //     },
  //   ])
  User.aggregate([
    {
      $project: { name: 1, phone: 1, email: 1 },
    },
    {
      $group: {
        _id: '$name',
        count: { $count: {} },
      },
    },
  ])

    .then((user) => {
      res.json({
        user,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error occured!',
      });
    });
};
