import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TipoAluno } from "./student.enum";
import { LessonType } from "src/lesson/lesson.type";
import { Ano } from "./ano.enum";

@ObjectType('Student')
export class StudentType{
    @Field(type => ID)
    id:string;
    
    @Field()
    nome:string;
    
    @Field(type=>Ano)
    ano:Ano;

    @Field(type => TipoAluno)
    tipo:TipoAluno;

    @Field(type=>[LessonType])
    lesson:LessonType[];
}