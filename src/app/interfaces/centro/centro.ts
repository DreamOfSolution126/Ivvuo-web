export interface ICentro {
    _id?: string;
    apiKey?: string;
    name?: string;
    code?: string;
    zone?: string;
    city?: string;
    address?: string;
    direccion?: {
        direccion?: string;
        ciudad?: string;
        departamento?: string;
        pais?: string;
    };
    telefono?: {
        indicativo?: string;
        numero?: string;
    };
    notas?: string;
    select?: boolean;
    viewValues?: boolean;
    active?: boolean;
    created?: string;
    account?: string;
    generateOrAuto?: boolean;
    configuraciones?: {
        verOrdenesPorCliente?: boolean;
        encuestaAlFinalizarAprobacion?: boolean;
        enviarSMS?: boolean;
        enviarWhatsApp?: boolean;
        servicioRecogida?: boolean;
    };
}

export const centroEstadoInicial = {
    apiKey: '',
    name: '',
    code: '',
    zone: '',
    city: '',
    address: '',
    direccion: {
        direccion: '',
        ciudad: '',
        departamento: '',
        pais: ''
    },
    telefono: {
        indicativo: '',
        numero: ''
    },
    notas: '',
    select: false,
    viewValues: false,
    active: false,
    created: '',
    account: '',
    generateOrAuto: true,
    configuraciones: {
        verOrdenesPorCliente: false,
        encuestaAlFinalizarAprobacion: false,
        enviarSMS: false,
        enviarWhatsApp: false,
        servicioRecogida: false
    }
};

