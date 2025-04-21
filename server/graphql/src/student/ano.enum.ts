import { registerEnumType } from "@nestjs/graphql";

export enum Ano{
    PRIMEIRO = "1",
    SEGUNDO = "2",
    TERCEIRO = "3",
    QUARTO = "4",
    QUINTO = "5",
    SEXTO = "6",
    SETIMO = "7",
    OITAVO = "8",
    NONO = "9",
    DECIMO = "10",
    DECIMO_PRIMEIRO = "11",
    DECIMO_SEGUNDO = "12"
}

registerEnumType(Ano, {
    name: 'Ano', 
    description: 'Anos possíveis de um aluno',
  });