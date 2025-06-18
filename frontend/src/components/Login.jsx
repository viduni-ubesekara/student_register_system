import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin(); // go to dashboard
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          required
          value={form.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
