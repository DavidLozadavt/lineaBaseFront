import { DiaModel } from "./dia.model";
import { JornadaModel } from "./jornada.model";

export interface AsignacionDiaJornada {
  id?: number;
  idDia?: number;
  idJornada?: number;

  // objetos de dia y jornada
  dia?: DiaModel[];
  JornadaModel?: JornadaModel[];

  pivot?: AsignacionDiaJornada;
}