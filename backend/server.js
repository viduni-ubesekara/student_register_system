const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://udarademel2002:a24l1x3BesziJtUq@cluster0.gcc6ocg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
