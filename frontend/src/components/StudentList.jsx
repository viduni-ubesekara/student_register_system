import React, { useEffect, useState } from 'react';
import { Container, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'course', headerName: 'Course', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onEdit(params.row)}><Edit /></IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}><Delete /></IconButton>
        </>
      ),
    }
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom mt={4}>
        Registered Students
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
        />
      </div>
    </Container>
  );
};

export default StudentList;
