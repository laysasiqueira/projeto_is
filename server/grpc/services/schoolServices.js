const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/students.json');
const { getStudents, addStudent } = require('../data/dataHandler');

const SchoolService = {
  GetStudent: (call, callback) => {
    const students = getStudents();
    const student = students.find(s => s.id === call.request.id);
    if (student) {
      callback(null, student);
    } else {
      callback(new Error("Student not found"));
    }
  },

  ListStudents: (call) => {
    const students = getStudents();
    students.forEach(s => call.write(s));
    call.end();
  },

  AddStudents: (call, callback) => {
    let count = 0;
    call.on('data', (student) => {
      addStudent(student);
      count++;
    });

    call.on('end', () => {
      callback(null, { totalAdded: count });
    });
  },

  /**UpdateStudent: (call, callback) => {
    const { id, ...updatedData } = call.request;
    const success = updateStudent(id, updatedData);
    if (success) {
      callback(null, { success: true });
    } else {
      callback(new Error("Student not found"));
    }
  },

  DeleteStudent: (call, callback) => {
    const success = deleteStudent(call.request.id);
    if (success) {
      callback(null, { success: true });
    } else {
      callback(new Error("Student not found"));
    }
  },**/

  UpdateStudent: (call, callback) => {
    console.log('🔧 UpdateStudent chamado:', call.request);
    const { id, name } = call.request;
    const students = getStudents();
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
      students[index].name = name;
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf8');
      callback(null, students[index]);
    } else {
      callback(new Error('Aluno não encontrado.'));
    }
  },

  // ✅ NOVO: Remover aluno
  DeleteStudent: (call, callback) => {
    console.log('🔧 UpdateStudent chamado:', call.request);
    const { id } = call.request;
    let students = getStudents();
    const originalLength = students.length;
    students = students.filter(s => s.id !== id);

    if (students.length < originalLength) {
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf8');
      callback(null, { success: true });
    } else {
      callback(null, { success: false });
    }
  },

  Chat: (call) => {
    call.on('data', (msg) => {
      console.log(`Message from ${msg.from}: ${msg.content}`);
      call.write({ from: 'Server', content: `Echo: ${msg.content}` });
    });

    call.on('end', () => {
      call.end();
    });
  },
};

module.exports = SchoolService;
