import React, { useState } from "react";

const EditModal = ({ student, onSave, onClose }) => {
  const [subjects, setSubjects] = useState(
    student.subjects.map((s) => ({ ...s })),
  );

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-indigo-300 mb-4">
          Edit {student.name}
        </h2>
        {subjects.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="flex-1 bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              value={s.name}
              onChange={(e) => updateSubject(i, "name", e.target.value)}
            />
            <input
              className="w-24 bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              type="number"
              value={s.grade}
              onChange={(e) => updateSubject(i, "grade", e.target.value)}
            />
          </div>
        ))}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl font-bold transition"
            onClick={() => onSave({ ...student, subjects })}
          >
            Save
          </button>
          <button
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-xl font-bold transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
