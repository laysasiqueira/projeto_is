import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { TipoDisciplina } from "./lesson.enum";

@Entity()
export class Lesson{
    @ObjectIdColumn()
    _id:string;

    @PrimaryColumn()
    id:string;

    @Column()
    nome:string;
    
    @Column()
    docente:string;

    @Column()
    tipo:TipoDisciplina;
}