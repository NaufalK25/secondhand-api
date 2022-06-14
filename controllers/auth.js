const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User, Profile } = require('../models');

module.exports = {
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        data: errors.array()
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  },
  register: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        data: errors.array()
      });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const profile = await Profile.create({ userId: user.id, name });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user, profile }
    });
  }
};
