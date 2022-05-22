import { ItemCotizacion } from '../cotizacion/item-cotizacion';

export interface IActividad {
    id?: string;
    listId?: string;
    processId?: string;
    account_code?: string;
    name?: string;
    details?: string;
    weight?: number;
    type?: string;
    answer?: {
        value: number;
        answer: string;
    };
    asnwer_options?: IOpcionRespuesta[];
    parts?: number;
    mo?: number;
    total?: number;
    tercero?: number;
    quotation?: any;
    cotizacion?: ItemCotizacion[];
    resQuotation?: {
        status?: string;
        date?: string;
        block?: boolean;
    };
    seeCustomer?: boolean;
    createUp?: string;
    index?: number;
    seguimiento?: {
        activar?: boolean;
        fechaProximoContacto?: string;
        razonRechazo?: string;
    };
    attach: Array<IAttach>;
}

export interface IAttach {
    url: string;
    type: string;
    date: string;
    cargado: {
        url: string;
        estatus: boolean;
    };
}

export interface IOpcionRespuesta {
    answer: string;
    value: number;
    style?: string;
}

export const estadoInicialActividad: IActividad = {
    listId: '',
    processId: '',
    account_code: '',
    name: '',
    details: '',
    weight: 0,
    type: '',
    attach: [],
    answer: {
        value: null,
        answer: ''
    },
    asnwer_options: [],
    parts: 0,
    mo: 0,
    total: 0,
    tercero: 0,
    quotation: {
        parts: [],
        mo: []
    },
    cotizacion: [],
    resQuotation: {
        status: '',
        date: '',
        block: false
    },
    seeCustomer: true,
    createUp: '',
    index: 0,
    seguimiento: {
        activar: false,
        fechaProximoContacto: '',
        razonRechazo: ''
    }
};

export const estadoInicialItemCotizacion = {
    tipo: '',
    referencia: '',
    descripcion: '',
    codigoDeParte: '',
    cantidad: 0,
    valorUnitario: 1,
    valorTotal: 0
};
