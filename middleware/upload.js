// multer use for photo upload
const multer = require('multer');
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/photo');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//   dest: 'public/photo' });
module.exports.uploadProfilePhoto = upload.single('photo');
