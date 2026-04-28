import React, { useState } from "react";
import EditModal from "./EditModal";

function getGPAColor(gpa) {
  if (gpa >= 85) return "text-green-500";
  if (gpa >= 70) return "text-yellow-500";
  return "text-red-500";
}

function calculateGPA(subjects) {
  if (!subjects.length) return 0;
  const total = subjects.reduce((sum, s) => sum + s.grade, 0);
  return (total / subjects.length).toFixed(2);
}

const StudentCard = ({ student, onDelete, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const gpa = calculateGPA(student.subjects);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold">{student.name}</h3>
        <div className="flex gap-3">
          <button
            className="text-indigo-400 hover:text-indigo-600 text-sm"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>
          <button
            className="text-red-400 hover:text-red-600 text-sm"
            onClick={() => onDelete(student._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="space-y-1 mb-4">
        {student.subjects.map((s, i) => (
          <div key={i} className="flex justify-between text-gray-300 text-sm">
            <span>{s.name}</span>
            <span className="font-semibold">{s.grade}</span>
          </div>
        ))}
      </div>
      <div className={`text-2xl font-bold ${getGPAColor(gpa)}`}>GPA: {gpa}</div>
      {showEdit && (
        <EditModal
          student={student}
          onSave={(updated) => {
            onEdit(updated);
            setShowEdit(false);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

export default StudentCard;
