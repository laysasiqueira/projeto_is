import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import {v4 as uuid} from 'uuid'
import { CreateLessonInput } from './lesson.input';
import { EditLessonInput } from './edit-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ){}

    async getLesson(id:string){
        return this.lessonRepository.findOne({where:{id}});
    }

    async getLessons(){
        return this.lessonRepository.find();
    }

    async createLesson(createLessonInput:CreateLessonInput):Promise<Lesson> {
        const { nome, docente, tipo} = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            nome,
            docente,
            tipo
        });

        return this.lessonRepository.save(lesson);
    }

    async getLessonsByIds(ids: string[]): Promise<Lesson[]> {
        return this.lessonRepository.find({
          where: {
            id: { $in: ids } as any
          },
        });
      }

    async deleteLesson(id:string){
        let lesson = await this.lessonRepository.findOne({where:{id}});
        if (lesson){
            await this.lessonRepository.delete(lesson._id);
            return true
        }
    }

    async editLesson(editLessonInput:EditLessonInput):Promise<Lesson>{
        const {id, docente} = editLessonInput;
        let lesson = await this.lessonRepository.findOne({where:{id}});
        if (!lesson) {
            throw new Error(`Estudante com ID '${id}' não encontrado.`);
        }
        lesson.docente= docente;
        return await this.lessonRepository.save(lesson);
    }

}
