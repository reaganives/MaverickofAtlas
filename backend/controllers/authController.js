require('dotenv').config();
const Joi = require('joi');
const User = require('../models/User');  // Import your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the Joi schema
const registrationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
    }),
    dob: Joi.date().iso().required().messages({
        'date.base': 'Invalid date format.',
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

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,  // Ensure this line is fetching the JWT secret
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const register = async (req, res) => {
    const { name, dob, email, password } = req.body;

    // Validate the incoming request data with Joi
    const { error } = registrationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            dob,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success and the token
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    login,
    register
};

