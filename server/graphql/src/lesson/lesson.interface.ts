import { TipoDisciplina } from "./lesson.enum";

export interface Lesson {
  id: string;
  nome: string;
  docente: string;
  tipo: TipoDisciplina;
}
