import { Module } from '@nestjs/common';
import {LessonResolver} from './lesson.resolver';
import { LessonService } from './lesson.service';
import { JsonStorageModule } from 'src/jsonstorage/json-storage.module';

@Module({
    imports:[
        JsonStorageModule
    ],
    providers:[LessonResolver, LessonService],
    exports:[LessonService]
})
export class LessonModule {}
