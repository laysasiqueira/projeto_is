import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { CreateStudentInput } from "./student.input";
import { StudentService } from "./student.service";
import { AssignLessonsInput } from "./assign-lessons.input";
import { LessonService } from "src/lesson/lesson.service";
import { LessonType } from "src/lesson/lesson.type";
import { Student } from "./student.entity";
import { Lesson } from "src/lesson/lesson.entity";
import { DeleteResult } from "typeorm";

@Resolver(of => StudentType)
export class StudentResolver{
    constructor(
        private studentService: StudentService,
        private lessonService: LessonService,
    ){}
    @Query(returns => StudentType)
    student(
        @Args('id') id: string,
    ){
        return this.studentService.getStudent(id);
    }

    @Query(returns => [StudentType])
    students(){
        return this.studentService.getStudents();
    }

    @Mutation(returns => StudentType)
    createStudent( 
        @Args('createStudentInput')createStudentInput:CreateStudentInput
    ){
        return this.studentService.createStudent(createStudentInput);
    }

    @Mutation(returns=>StudentType)
    assignLessons(
        @Args('assignLessonsIn') assignLessonsInput:AssignLessonsInput,
    ){
        const {studentId, lessonIds} = assignLessonsInput;
        return this.studentService.assignLessons(studentId, lessonIds)
    }

    @ResolveField(() => [LessonType])
    async lessons(@Parent() student: Student): Promise<Lesson[]> {
    if (!student.lessons || student.lessons.length === 0) return [];
    return this.lessonService.getLessonsByIds(student.lessons);
    }

    @Mutation(returns=>Boolean)
    deleteStudent(
        @Args('id') id:string,
    ){
        return this.studentService.deleteStudent(id);
    }
}