import { ILista } from '../interfaces/listas';
import { TipoCalle } from '../enum/tipo-calle.enum';

export const listaItemTiposCalle: ILista[] = [
    {
        valor: TipoCalle.AVENIDA,
        nombre: TipoCalle.AVENIDA
    },
    {
        valor: TipoCalle.AVENIDA_CALLE,
        nombre: TipoCalle.AVENIDA_CALLE
    },
    {
        valor: TipoCalle.AVENIDA_CARRERA,
        nombre: TipoCalle.AVENIDA_CARRERA
    },
    {
        valor: TipoCalle.CALLE,
        nombre: TipoCalle.CALLE
    },
    {
        valor: TipoCalle.CARRERA,
        nombre: TipoCalle.CARRERA
    },
    {
        valor: TipoCalle.DIAGONAL,
        nombre: TipoCalle.DIAGONAL
    },
    {
        valor: TipoCalle.TRANSVERSAL,
        nombre: TipoCalle.TRANSVERSAL
    },

];
