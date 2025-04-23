import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';


@Injectable()
export class JsonStorageService {
  private readonly studentsFilePath = path.resolve(__dirname, '..',"..", 'data', 'students.json');
  private readonly lessonsFilePath = path.resolve(__dirname, '..',"..", 'data', 'lessons.json');



  // Ler todos os alunos
  async readStudents(): Promise<any[]> {
    try {
      const content = await fs.readFile(this.studentsFilePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  // Escrever todos os alunos
  async writeStudents(data: any[]): Promise<void> {
    await fs.mkdir(path.dirname(this.studentsFilePath), { recursive: true });
    await fs.writeFile(this.studentsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Ler todas as disciplinas
  async readLessons(): Promise<any[]> {
    try {
      const content = await fs.readFile(this.lessonsFilePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  // Escrever todas as disciplinas
  async writeLessons(data: any[]): Promise<void> {
    await fs.mkdir(path.dirname(this.lessonsFilePath), { recursive: true });
    await fs.writeFile(this.lessonsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
