import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => setRefresh(!refresh);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Student Registration</h2>
      <StudentForm
        selectedStudent={selectedStudent}
        clearSelectedStudent={() => setSelectedStudent(null)}
        refreshList={refreshList}
      />
      <StudentList key={refresh} onEdit={setSelectedStudent} />
    </div>
  );
}

export default App;
