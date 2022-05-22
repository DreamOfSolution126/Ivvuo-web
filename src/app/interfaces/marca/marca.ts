export interface IMarca {
    _id?: string;
    activo?: boolean;
    marca?: string;
    cuentas?: string[];
    centros?: string[];
    pais?: {
        codigo?: string;
        nombre?: string;
    };
    logo?: {
        url?: string;
    };
}

export interface IConsultaPorId {
    id: string;
}

export const marcaEstadoInicial: IMarca = {
    activo: true,
    marca: '',
    cuentas: [],
    centros: [],
    pais: {
        codigo: '',
        nombre: ''
    },
    logo: {
        url: 'https://ivvuo.com/assets/img/logo/logo_mapp.png'
    }
};
