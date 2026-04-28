import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import GPAChart from "./components/GPAChart";

const API = "http://localhost:5000";

const App = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (studentData) => {
    await axios.post(`${API}/students`, studentData);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/students/${id}`);
    fetchStudents();
  };

  const handleEdit = async (updatedStudent) => {
    await axios.put(`${API}/students/${updatedStudent._id}`, updatedStudent);
    fetchStudents();
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-400">
        🎓 Student Grade Tracker
      </h1>
      <StudentForm onAdd={handleAdd} />

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          className="w-full bg-gray-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          placeholder="🔍 Search by student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StudentList
        students={filteredStudents}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <GPAChart students={filteredStudents} />
    </div>
  );
};

export default App;
