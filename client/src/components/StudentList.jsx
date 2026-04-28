import React from "react";
import StudentCard from "./StudentCard";

const StudentList = ({ students, onDelete, onEdit }) => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default StudentList;
