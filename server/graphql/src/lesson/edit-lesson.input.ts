import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { TipoDisciplina } from "./lesson.enum";

@InputType()
export class EditLessonInput{
    
    @IsString()
    @Field()
    id:string;

    @MinLength(1)
    @IsString()
    @Field()
    docente:string;
    }