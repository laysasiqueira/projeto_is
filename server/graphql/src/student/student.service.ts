import { Injectable } from '@nestjs/common';
import { JsonStorageService } from '../jsonstorage/json-storage.service';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';
import { Student } from './student.interface'; // Importa a interface

@Injectable()
export class StudentService {
  constructor(private readonly jsonStorage: JsonStorageService) {}

  // Obter um estudante por ID
  async getStudent(id: string): Promise<Student | undefined> {
    const students = await this.jsonStorage.readStudents();
    return students.find(student => student.id === id);
  }

  // Obter todos os estudantes
  async getStudents(): Promise<Student[]> {
    return this.jsonStorage.readStudents();
  }

  // Criar um novo estudante
  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { nome, ano, tipo } = createStudentInput;
    const student: Student = {
      id: uuid(),
      nome,
      ano,
      tipo,
      lessons: [], // Inicializa com um array vazio de lessons
    };

    const students = await this.jsonStorage.readStudents();
    students.push(student);
    await this.jsonStorage.writeStudents(students);
    return student;
  }

  // Atribuir lições a um estudante
  async assignLessons(studentId: string, lessonIds: string[]): Promise<Student> {
    const students = await this.jsonStorage.readStudents();
    const student = students.find(s => s.id === studentId);

    if (!student) {
      throw new Error(`Estudante com ID '${studentId}' não encontrado.`);
    }

    if (!student.lessons) {
      student.lessons = [];
    }

    const newLessons = lessonIds.filter(id => !student.lessons.includes(id));
    student.lessons = [...student.lessons, ...newLessons];

    await this.jsonStorage.writeStudents(students);
    return student;
  }

  // Deletar um estudante
  async deleteStudent(id: string): Promise<boolean> {
    const students = await this.jsonStorage.readStudents();
    const initialLength = students.length;
    const filtered = students.filter(student => student.id !== id);

    await this.jsonStorage.writeStudents(filtered);
    return filtered.length < initialLength;
  }
}
