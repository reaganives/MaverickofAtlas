require('dotenv').config();
const Joi = require('joi');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const Order = require('../models/Order');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Define Joi schemas
const registrationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
    }),
    dob: Joi.string().required().messages({
        'string.pattern.base': 'Date of birth must be in "Month Day, Year" format (e.g., January 1, 2000).',
        'any.required': 'Date of birth is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(8).max(30).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.max': 'Password cannot exceed 30 characters.',
    })
});

const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
      'any.only': 'Confirm password must match password',
    })
});

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};


// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register or check your email.' });
    }

    if (!user.isVerified) {
      // Handle verification logic here
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Clear guest token to prevent access to guest cart
    res.clearCookie('guestToken');

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: '.reaganives.io',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: '.reaganives.io',
    });

    // Use or create a shopifyCartToken
    let cartToken = user.shopifyCartToken;
    if (!cartToken) {
      // Create a new Shopify cart if it doesn't exist
      cartToken = await createNewShopifyCart(); // Implement this function to create a cart using the Shopify API
      user.shopifyCartToken = cartToken;
      await user.save();
    }

    // Set cart token for logged-in user
    res.cookie('shopifyCartToken', cartToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: '.reaganives.io',
    });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Register function
const register = async (req, res) => {
    const { name, dob, email, password } = req.body;

    // Validate the incoming request data with Joi
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');  // Generate a random token

        const newUser = new User({
            name,
            dob,
            email,
            password: hashedPassword,
            verificationToken
        });

        await newUser.save();

        // Generate verification link
        const verificationLink = `https:moa.reaganives.io/verify-email/${verificationToken}`;

        // Set up email parameters
        const params = {
            Destination: { ToAddresses: [email] },
            Message: {
                Body: {
                    Html: { Data: `<p>Please click the link below to verify your account:</p><a href="${verificationLink}">Verify Account</a>` }
                },
                Subject: { Data: 'Verify Your Email' }
            },
            Source: process.env.EMAIL_SOURCE
        };

        // Send the email
        await ses.sendEmail(params).promise();
        console.log('Verification email sent.');

        res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Verify Email function
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Generate JWT for the user to automatically log them in
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('accessToken', jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          domain: '.reaganives.io', // Set to your domain to share cookies across subdomains
        });

        res.status(200).json({
            message: 'Email verified successfully!',
            user: { _id: user._id },
        });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Configure AWS SDK for sending emails
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Send Password Reset Email
const sendPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: process.env.NODE_ENV === 'production', message: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `https://moa.reaganives.io/reset-password/${token}`;

        const params = {
            Destination: { ToAddresses: [email] },
            Message: {
                Body: { Html: { Data: `<a href="${resetLink}">Reset Password</a>` } },
                Subject: { Data: 'Password Reset' }
            },
            Source: process.env.EMAIL_SOURCE,
        };

        const data = await ses.sendEmail(params).promise();
        console.log('Email sent:', data);

        res.status(200).json({ success: true, message: 'Password reset link sent' });
    } catch (error) {
        console.error('Error sending email via AWS SES:', error);
        res.status(500).json({ success: process.env.NODE_ENV === 'production', message: 'Failed to send reset email' });
    }
};

// Reset Password function
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // Validate using Joi
    const { error } = passwordSchema.validate({ password, confirmPassword });
    if (error) {
        return res.status(400).json({ success: process.env.NODE_ENV === 'production', message: error.details[0].message });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: process.env.NODE_ENV === 'production', message: 'User not found' });
        }

        // Check if new password is the same as the old password
        const isSameAsOldPassword = await bcrypt.compare(password, user.password);
        if (isSameAsOldPassword) {
            return res.status(400).json({ success: process.env.NODE_ENV === 'production', message: 'New password cannot be the same as the old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ success: process.env.NODE_ENV === 'production', message: 'Token has expired' });
        }
        res.status(500).json({ success: process.env.NODE_ENV === 'production', message: 'Failed to reset password' });
    }
};

// Refresh Token function
const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Automatically sent by the browser

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send new access token back in a cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain: '.reaganives.io', // Set to your domain to share cookies across subdomains
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Error refreshing token:', err);
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

// Logout function
const logout = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const cartToken = req.cookies.shopifyCartToken;

    if (userId && cartToken) {
      // Save the cart token to the user's account
      await User.findByIdAndUpdate(userId, { shopifyCartToken: cartToken });
    }

    // Clear user-specific cookies
    res.clearCookie('accessToken', { 
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.reaganives.io', 
    });
    res.clearCookie('refreshToken', { 
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.reaganives.io', 
    });
    res.clearCookie('shopifyCartToken', { 
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.reaganives.io', 
    });

    // Optionally set a new guest token to start a new guest session
    const guestToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('guestToken', guestToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: '.reaganives.io',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
};




// Get the current authenticated user and their order history
const getCurrentUser = async (req, res) => {
  try {
    // Get the access token from the cookies
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Find the user by the id in the decoded token
    const userId = decoded.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user's orders
    const orders = await Order.find({ user: userId });

    res.json({ user, orders });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: err.message });
  }
};

const checkAuth = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.json({ isAuthenticated: process.env.NODE_ENV === 'production' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAuthenticated: true });
  } catch (err) {
    return res.json({ isAuthenticated: process.env.NODE_ENV === 'production' });
  }
};

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Send confirmation/welcome email
    const params = {
      Source: process.env.EMAIL_SOURCE, // Must be a verified SES email
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Welcome to Our Newsletter!',
        },
        Body: {
          Html: {
            Data: `<p>Thank you for subscribing to our newsletter!</p>
                   <p>Stay tuned for updates and promotions.</p>`,
          },
        },
      },
    };

    await ses.sendEmail(params).promise();

    res.status(200).json({ message: 'Subscription successful, welcome email sent!' });
  } catch (error) {
    console.error('Error sending email or saving subscriber:', error);
    res.status(500).json({ message: 'Error subscribing to newsletter' });
  }
};

module.exports = {
    login,
    register,
    sendPasswordReset,
    resetPassword,
    verifyEmail,
    refreshToken,
    logout,
    getCurrentUser,
    checkAuth,
    subscribeNewsletter
};