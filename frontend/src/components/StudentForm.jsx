import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const StudentForm = ({ selectedStudent, clearSelectedStudent, refreshList }) => {
  const [student, setStudent] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    } else {
      setStudent({ name: '', email: '', course: '' });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student._id) {
      await axios.put(`http://localhost:5000/api/students/${student._id}`, student);
      alert('Student Updated!');
    } else {
      await axios.post('http://localhost:5000/api/students', student);
      alert('Student Registered!');
    }

    //clearSelectedStudent();
    refreshList(); // refresh list in parent
    setStudent({ name: '', email: '', course: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" name="name" value={student.name} onChange={handleChange} required />
        <TextField label="Email" name="email" value={student.email} onChange={handleChange} required />
        <TextField label="Course" name="course" value={student.course} onChange={handleChange} required />
        <Button variant="contained" type="submit">
          {student._id ? 'Update Student' : 'Register Student'}
        </Button>
      </Box>
    </Container>
  );
};

export default StudentForm;
