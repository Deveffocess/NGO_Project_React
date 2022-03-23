const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id },'ngo_password', {
    expiresIn: "1d",
  });
};

module.exports = generateToken;