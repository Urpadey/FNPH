const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.ADMINKEY);
  const { _id } = decoded;
  console.log(_id);
  next();
};

module.exports = auth;
