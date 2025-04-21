import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ){}

    async getStudent(id:string){
        return await this.studentRepository.findOne({where:{id}});
    }

    async getStudents(){
        return this.studentRepository.find();
    }

    async createStudent(createStudentInput:CreateStudentInput):Promise<Student> {
        const { nome, ano, tipo} = createStudentInput;

        const student = this.studentRepository.create({
            id: uuid(),
            nome,
            ano,
            tipo
        });

        return this.studentRepository.save(student);
    }

    async assignLessons(studentId:string, lessonIds:string[]):Promise<Student>{
        const student = await this.studentRepository.findOne({where:{id:studentId}});
        if (!student) {
            throw new Error(`Estudante com ID '${studentId}' não encontrado.`);
        }
        if (!student.lessons) {
            student.lessons = [];
        }
        const newLessons = lessonIds.filter(id => !student.lessons.includes(id));
        student.lessons = [...student.lessons, ...newLessons];
        return this.studentRepository.save(student);
    }

    async deleteStudent(id:string){
        let student = await this.studentRepository.findOne({where:{id}});
        if (student){
            await this.studentRepository.delete(student._id);
            return true;
        }
        return false;
    }
}
