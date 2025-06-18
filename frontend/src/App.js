import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Login from './components/Login';
import Signup from './components/Signup';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Root path shows login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const LoginWrapper = () => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Navigate to="/dashboard" />;
  return <Login onLogin={() => setRedirect(true)} onSwitchToSignup={() => window.location.href = '/signup'} />;
};

const SignupWrapper = () => {
  return <Signup onSwitchToLogin={() => window.location.href = '/login'} />;
};

const Dashboard = () => (
  <>
    <h2 style={{ textAlign: 'center' }}>Student Registration</h2>
    <StudentForm />
    <StudentList />
  </>
);

export default App;
