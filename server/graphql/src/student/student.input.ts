import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { TipoAluno } from "./student.enum";
import { Ano } from "./ano.enum";

@InputType()
export class CreateStudentInput{
    @MinLength(1)
    @Field()
    nome:string;
    
    @MinLength(1)
    @IsString()
    @Field()
    ano:Ano;
    
    @IsString()
    @Field()
    tipo:TipoAluno;
    
}