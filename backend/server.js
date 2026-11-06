
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/college")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

app.get("/student", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post("/student", async (req, res) => {
    const student = new Student(req.body);
    await student.save();

    res.json({ message: "Student added successfully" });
});

app.put("/student/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: "Student updated successfully" });
});

app.delete("/student/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
