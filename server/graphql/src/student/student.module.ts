import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { LessonModule } from 'src/lesson/lesson.module';
import { JsonStorageModule } from 'src/jsonstorage/json-storage.module';

@Module({
  imports:[
    LessonModule,
    JsonStorageModule
],
  providers: [StudentResolver, StudentService]
})
export class StudentModule {}
