const bcrypt = require("bcryptjs");

const passwordGenerator = () => {
  const password = "period123";
  const encrypted = bcrypt.hashSync(password, 8);
  return encrypted;
};

module.exports = passwordGenerator;
