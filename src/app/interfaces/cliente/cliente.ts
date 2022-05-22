export interface ICliente {
    _id?: string;
    creado: string;
    creadoDesdeZonaCliente: boolean;
    centro: string;
    contrasena?: string;
    cuenta: string;
    email: string;
    identificacion: {
        numero: string;
        tipo: string;
    };
    nombre: {
        apellidos: string;
        nombres: string;
        tratamiento: string;
        razonSocial: string;
    };
    orden: string;
    telefono: {
        codigoPais: string;
        numero: string;
        celular: string;
    };
    direcciones: IDireccion[];
}

export const clienteEstadoInicial: ICliente = {
    orden: '',
    creado: '',
    creadoDesdeZonaCliente: false,
    centro: '',
    contrasena: '',
    cuenta: '',
    email: '',
    identificacion: {
        tipo: '',
        numero: ''
    },
    nombre: {
        nombres: '',
        apellidos: '',
        razonSocial: '',
        tratamiento: ''
    },
    telefono: {
        codigoPais: '',
        celular: '',
        numero: ''
    },
    direcciones: []
};

export interface IDireccion {
    pais: string;
    ciudad: string;
    barrio: string;
    tipoPrincipal: string;
    principal: string;
    secundaria: string;
    numero: string;
    adicional: string;
}

export const direccionInicialEstado: IDireccion = {
    pais: '',
    ciudad: '',
    barrio: '',
    tipoPrincipal: 'Selecciona',
    principal: '',
    secundaria: '',
    numero: '',
    adicional: ''
};

export interface IObtener {
    identificacion: string;
    cuenta: string;
}

export interface IEditar {
    data: ICliente;
    id: string;
}
