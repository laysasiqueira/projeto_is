import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.interface'; // Importa a interface
import { EditLessonInput } from './edit-lesson.input';
import { JsonStorageService } from 'src/jsonstorage/json-storage.service'; // Importe o serviço


@Injectable()
export class LessonService {
  constructor(private readonly jsonStorage: JsonStorageService) {}

  // Obter uma lição por ID
  async getLesson(id: string): Promise<Lesson | undefined> {
    const lessons = await this.jsonStorage.readLessons();
    return lessons.find(lesson => lesson.id === id);
  }

  // Obter todas as lições
  async getLessons(): Promise<Lesson[]> {
    return this.jsonStorage.readLessons();
  }

  // Criar uma nova lição
  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { nome, docente, tipo } = createLessonInput;
    const lesson: Lesson = {
      id: uuid(),
      nome,
      docente,
      tipo,
    };

    const lessons = await this.jsonStorage.readLessons();
    lessons.push(lesson);
    await this.jsonStorage.writeLessons(lessons);
    return lesson;
  }

  // Deletar uma lição
  async deleteLesson(id: string): Promise<boolean> {
    const lessons = await this.jsonStorage.readLessons();
    const initialLength = lessons.length;
    const filtered = lessons.filter(lesson => lesson.id !== id);

    await this.jsonStorage.writeLessons(filtered);
    return filtered.length < initialLength;
  }

  // Editar uma lição (por exemplo, alterar o docente)
  async editLesson(editLessonInput:EditLessonInput): Promise<Lesson | undefined> {

    let id=editLessonInput.id; 
    let docente=editLessonInput.docente;
    const lessons = await this.jsonStorage.readLessons();
    const lesson = lessons.find(lesson => lesson.id === id);

    if (!lesson) {
      throw new Error(`Lição com ID '${id}' não encontrada.`);
    }

    lesson.docente = docente;
    await this.jsonStorage.writeLessons(lessons);
    return lesson;
  }

  async getLessonsByIds(ids: string[]): Promise<Lesson[]> {
    const lessons = await this.jsonStorage.readLessons();
    return lessons.filter(lesson => ids.includes(lesson.id));
  }

}
