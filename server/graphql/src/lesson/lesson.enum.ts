import { registerEnumType } from "@nestjs/graphql";

export enum TipoDisciplina{
    SEMESTRAL = "Semestral",
    ANUAL = "Anual"
}

registerEnumType(TipoDisciplina, {
    name: 'TipoDisciplina', 
    description: 'Tipos possíveis de uma disciplina',
  });