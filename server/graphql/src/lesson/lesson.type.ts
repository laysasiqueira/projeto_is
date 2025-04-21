import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TipoDisciplina } from "./lesson.enum";

@ObjectType('Lesson')
export class LessonType{
    @Field(type => ID)
    id:string;
    
    @Field()
    nome:string;
    
    @Field()
    docente:string;

    @Field(type => TipoDisciplina)
    tipo:TipoDisciplina;
}