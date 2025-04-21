import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { LessonModule } from 'src/lesson/lesson.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student]),
    LessonModule
],
  providers: [StudentResolver, StudentService]
})
export class StudentModule {}
