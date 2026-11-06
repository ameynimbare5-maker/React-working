
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const [editId, setEditId] = useState(null);

    // Display students
    const getStudents = () => {
      
        axios.get("http://localhost:5000/student")
            .then(res => {
                setStudents(res.data);
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

    // Add or Update student
    const saveStudent = () => {

        const student = {
            name: name,
            email: email,
            course: course
        };

        if (editId) {

            axios.put(
                "http://localhost:5000/student/" + editId,
                student
            ).then(() => {
                alert("Student Updated");
                clearForm();
                getStudents();
            });

        } else {

            axios.post(
                "http://localhost:5000/student",
                student
            ).then(() => {
                alert("Student Added");
                clearForm();
                getStudents();
            });
        }
    };

    // Delete student
    const deleteStudent = (id) => {

        axios.delete("http://localhost:5000/student/" + id)
            .then(() => {
                alert("Student Deleted");
                getStudents();
            });
    };

    // Edit student
    const editStudent = (student) => {

        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
        setEditId(student._id);
    };

    // Clear form
    const clearForm = () => {
        setName("");
        setEmail("");
        setCourse("");
        setEditId(null);
    };

    return (
        <div className="container">

            <h1>Student Management System</h1>

            <h2>{editId ? "Update Student" : "Add Student"}</h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            />

            <button onClick={saveStudent}>
                {editId ? "Update Student" : "Add Student"}
            </button>

            <button onClick={clearForm}>
                Clear
            </button>

            <h2>Student Records</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>

                            <td>
                                <button onClick={() => editStudent(student)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteStudent(student._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default App;
