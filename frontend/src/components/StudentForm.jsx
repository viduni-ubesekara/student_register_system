import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const StudentForm = () => {
  const [student, setStudent] = useState({ name: '', email: '', course: '' });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/students', student);
    alert('Student Registered!');
    setStudent({ name: '', email: '', course: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" name="name" value={student.name} onChange={handleChange} required />
        <TextField label="Email" name="email" value={student.email} onChange={handleChange} required />
        <TextField label="Course" name="course" value={student.course} onChange={handleChange} required />
        <Button variant="contained" type="submit">Register</Button>
      </Box>
    </Container>
  );
};

export default StudentForm;
