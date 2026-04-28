const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/gradetracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Student Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

// Routes
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});