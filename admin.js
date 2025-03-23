const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
router.post('/register', async (req, res) => { const { username, password } = req.body; const hashedPassword = await bcrypt.hash(password, 10); const newAdmin = new Admin({ username, password: hashedPassword }); await newAdmin.save(); res.json({ message: 'Admin registered!' }); });
router.post('/login', async (req, res) => { const { username, password } = req.body; const admin = await Admin.findOne({ username }); if (!admin || !(await bcrypt.compare(password, admin.password))) return res.status(401).json({ message: 'Invalid credentials' }); const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' }); res.json({ token }); });
module.exports = router;