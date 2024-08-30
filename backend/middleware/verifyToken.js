const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const verifyUserOrGuestToken = (req, res, next) => {
  let token = req.cookies.accessToken || req.cookies.guestToken;

  // If user token exists, try to verify it
  if (req.cookies.accessToken) {
    try {
      const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
      req.user = decoded;  // Attach decoded user token to req
      return next();  // Proceed as an authenticated user
    } catch (err) {
      console.error('Invalid user token:', err.message);
      return res.status(401).json({ message: 'Invalid or expired user token' });
    }
  }

  // Handle guest token (create a new one if it doesn't exist or is invalid)
  if (!req.cookies.guestToken) {
    const guestToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('guestToken', guestToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    req.guestToken = guestToken;
    console.log('New guest token generated.');
  } else {
    try {
      jwt.verify(req.cookies.guestToken, process.env.JWT_SECRET);  // Verify the guest token
      req.guestToken = req.cookies.guestToken;
      console.log('Valid guest token.');
    } catch (err) {
      console.error('Invalid guest token:', err.message);
      const newGuestToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('guestToken', newGuestToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      req.guestToken = newGuestToken;
      console.log('New guest token generated due to invalid existing one.');
    }
  }

  next();  // Proceed to the next middleware or route handler
};

module.exports = verifyUserOrGuestToken;