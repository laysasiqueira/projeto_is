const { students } = require('../data/database');

const SchoolServices = {
  GetStudent: (call, callback) => {
    const student = students.find(s => s.id === call.request.id);
    if (student) {
      callback(null, student);
    } else {
      callback(new Error("Student not found"));
    }
  },

  ListStudents: (call) => {
    students.forEach(s => call.write(s));
    call.end();
  },

  AddStudents: (call, callback) => {
    let count = 0;
    call.on('data', (student) => {
      students.push(student);
      count++;
    });

    call.on('end', () => {
      callback(null, { totalAdded: count });
    });
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

module.exports = SchoolServices;
