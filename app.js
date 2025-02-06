document.addEventListener("DOMContentLoaded", function () {
    // Load existing students from localStorage
    loadStudents();

    const form = document.getElementById("student-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Collect student data
        const name = document.getElementById("student-name").value;
        const id = document.getElementById("student-id").value;
        const email = document.getElementById("student-email").value;
        const contact = document.getElementById("student-contact").value;

        // Validate input fields
        if (!name || !id || !email || !contact) {
            alert("All fields are required!");
            return;
        }

        if (isNaN(contact) || isNaN(id)) {
            alert("Student ID and Contact Number must be numeric.");
            return;
        }

        // Create student object
        const student = {
            name: name,
            id: id,
            email: email,
            contact: contact
        };

        // Add new student to localStorage
        addStudent(student);
        
        // Reset form
        form.reset();
    });
});

// Add student to localStorage
function addStudent(student) {
    const students = getStudentsFromStorage();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

// Load students from localStorage and display them
function loadStudents() {
    const students = getStudentsFromStorage();
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Get students from localStorage
function getStudentsFromStorage() {
    const students = localStorage.getItem("students");
    return students ? JSON.parse(students) : [];
}

// Edit student record
function editStudent(index) {
    const students = getStudentsFromStorage();
    const student = students[index];
    
    document.getElementById("student-name").value = student.name;
    document.getElementById("student-id").value = student.id;
    document.getElementById("student-email").value = student.email;
    document.getElementById("student-contact").value = student.contact;

    // Remove student before editing
    deleteStudent(index);
}

// Delete student record
function deleteStudent(index) {
    const students = getStudentsFromStorage();
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

// Function to load students from localStorage
function loadStudents() {
    const students = getStudentsFromStorage();
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
