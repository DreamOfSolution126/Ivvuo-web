import { TiposCotizacion } from '../../enum/tipos-cotizacion.enum';

export interface ItemCotizacion {
    tipo: string;
    descripcion: string;
    referencia: string;
    codigoDeParte: string;
    cantidad: number;
    valorUnitario: number;
    valorTotal: number;
}


export const estadoInicialItemContizacion = {
    tipo: TiposCotizacion.REPUESTO,
    referencia: '',
    descripcion: '',
    codigoDeParte: '',
    cantidad: 1,
    valorUnitario: 0,
    valorTotal: 0,
}