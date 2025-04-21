import { registerEnumType } from "@nestjs/graphql";

export enum TipoAluno{
    ERASMUS = "Erasmus",
    NACIONAL = "Nacional",
    INTERNACIONAL = "Internacional"
}

registerEnumType(TipoAluno, {
    name: 'TipoAluno', 
    description: 'Tipos possíveis de um aluno',
  });