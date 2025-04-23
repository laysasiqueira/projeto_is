import { Ano } from "./ano.enum";
import { TipoAluno } from "./student.enum";

export interface Student {
  id: string;
  nome: string;
  ano: Ano;
  tipo: TipoAluno;
  lessons: string[];  // Lista de IDs das lições
}
