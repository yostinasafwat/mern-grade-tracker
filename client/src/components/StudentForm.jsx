import React, { useState } from "react";

const StudentForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", grade: "" }]);
  const [loading, setLoading] = useState(false);

  const addSubject = () => setSubjects([...subjects, { name: "", grade: "" }]);

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleSubmit = async () => {
    if (!name) return alert("enter student name");
    setLoading(true);
    await onAdd({
      name,
      subjects: subjects.map((s) => ({ name: s.name, grade: Number(s.grade) })),
    });
    setName("");
    setSubjects([{ name: "", grade: "" }]);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">
        Add New Student
      </h2>
      <input
        className="w-full bg-gray-700 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {subjects.map((s, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="flex-1 bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Subject Name"
            value={s.name}
            onChange={(e) => updateSubject(i, "name", e.target.value)}
          />
          <input
            className="w-24 bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Grade"
            type="number"
            value={s.grade}
            onChange={(e) => updateSubject(i, "grade", e.target.value)}
          />
        </div>
      ))}
      <button
        className="text-indigo-400 text-sm mt-2 hover:underline"
        onClick={addSubject}
      >
        + Add Subject
      </button>
      <button
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Student"}
      </button>
    </div>
  );
};

export default StudentForm;
