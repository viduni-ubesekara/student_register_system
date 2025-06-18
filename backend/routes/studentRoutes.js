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
// GET - All students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE student
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
