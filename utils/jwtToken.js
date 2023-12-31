const jwt = require('jsonwebtoken');
const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
   "rohitsinghintern",
    { expiresIn: '1d' }
  );
};

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken)
    return res.status(400).json({ error: 'User not Authenticated!' });

  try {
    const validToken = jwt.verify(accessToken, "rohitsinghintern");
    if (validToken) {
      req.user=validToken;
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { generateAccessToken, verifyAccessToken };
