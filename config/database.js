const mongoose = require('mongoose');

const url = `mongodb+srv://shivamjaiswal:23VNi9CkhLbNnygt@cluster0.jhaba.mongodb.net/Assignment`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected to the database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
