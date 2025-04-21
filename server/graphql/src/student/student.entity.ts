import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { TipoAluno } from "./student.enum";
import { Ano } from "./ano.enum";

@Entity()
export class Student{
    @ObjectIdColumn()
    _id:string;

    @PrimaryColumn()
    id:string;

    @Column()
    nome:string;
    
    @Column()
    ano:Ano;

    @Column()
    tipo:TipoAluno;

    @Column()
    lessons: string[];
}