const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const verifyUserOrGuestToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const guestToken = req.cookies.guestToken;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded;  // Attach decoded user token to req
      return next();  // Proceed as an authenticated user
    } catch (err) {
      console.error('Invalid user token:', err.message);
      return res.status(401).json({ message: 'Invalid or expired user token' });
    }
  }

  // Handle guest token
  if (guestToken) {
    try {
      jwt.verify(guestToken, process.env.JWT_SECRET);  // Verify the guest token
      req.guestToken = guestToken;
      console.log('Valid guest token.');
    } catch (err) {
      console.error('Invalid guest token:', err.message);
      const newGuestToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('guestToken', newGuestToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      req.guestToken = newGuestToken;
      console.log('New guest token generated due to invalid existing one.');
    }
  } else {
    // Create a new guest token if one does not exist
    const newGuestToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('guestToken', newGuestToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    req.guestToken = newGuestToken;
    console.log('New guest token generated.');
  }

  next();  // Proceed to the next middleware or route handler
};

module.exports = verifyUserOrGuestToken;

