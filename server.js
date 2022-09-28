require('dotenv').config({ path: 'config.env' });
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('./config/database');

var Memcached = require('memcached');

var memcached = new Memcached();

memcached.connect('localhost:11211', function (err) {
  if (err) {
    console.log(conn.server, 'while memcached connection!!');
  } else {
    console.log('memcached connected!!');
  }
});
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');

const app = express();
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);

////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

//////////////////////////////////
//=====================primimum=======================
// const catchAsync = require('../utils/catchAsync');
// const Memcached = require('memcached');
// const memcached = new Memcached();
// let count = 0;
// const ristriction = catchAsync(async (req, res, next) => {

// });

// module.exports = {
//   ristriction,
// };
