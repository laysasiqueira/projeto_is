const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'students.json');

function getStudents() {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("❌ Failed to read students.json:", err);
    return [];
  }
}
function saveStudents(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf8');
}

function addStudent(newStudent) {
  console.log("📥 Adding student:", newStudent);
  const students = getStudents();
  students.push(newStudent);
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf8');
  console.log("✅ Student added. Total now:", students.length);
}
function updateStudent(id, updatedData) {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;
  students[index] = { ...students[index], ...updatedData };
  saveStudents(students);
  return true;
}

function deleteStudent(id) {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  if (filtered.length === students.length) return false;
  saveStudents(filtered);
  return true;
}

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
