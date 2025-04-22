const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, 'students.json');

function loadStudents() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveStudents(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf-8');
}

module.exports = { loadStudents, saveStudents };
