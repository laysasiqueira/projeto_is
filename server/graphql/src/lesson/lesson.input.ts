import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { TipoDisciplina } from "./lesson.enum";

@InputType()
export class CreateLessonInput{
    @MinLength(1)
    @Field()
    nome:string;
    
    @MinLength(1)
    @IsString()
    @Field()
    docente:string;
    
    @IsString()
    @Field()
    tipo:TipoDisciplina;
}