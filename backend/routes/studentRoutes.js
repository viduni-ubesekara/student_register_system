const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CREATE - Add a student
router.post('/', async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const student = new Student({ name, email, course });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
