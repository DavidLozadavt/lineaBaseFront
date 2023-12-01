import { ProcesoModel } from "./proceso.model";
import { TipoDocumentoModel } from "./tipo-documento.model";

export interface AsignacionProcesoTipoDocumentoModel {
    id?:number;
    idProceso:number;
    proceso?:ProcesoModel;
    idTipoDocumento:number;
    tipoDocumento?:TipoDocumentoModel;
}