export interface IUsuario {
    active?: boolean;
    account?: string[];
    centers?: string[];
    email?: string;
    last_name?: string;
    identificacion?: {
        tipo?: string;
        numero?: string;
    };
    imagenPerfil?: {
        url?: string;
        extension?: string;
    };
    lastLogin?: string;
    name?: string;
    marca?: string;
    password?: string;
    repeat_password?: string;
    confirmPassword?: string;
    newPassword: string;
    role?: string;
    singupDate?: string;
    perfilConductor?: {
        estatus?: boolean;
        licencia?: {
            tipo?: string;
            numero?: string;
            fechaExpedicion?: string;
        }
    };
    accesos: {
        tableroControl: boolean;
        reporteActividades: boolean;
    };
}

export const usuarioEstadoInicial: IUsuario = {
    active: true,
    account: [],
    centers: [],
    email: '',
    last_name: '',
    identificacion: {
        tipo: '',
        numero: '',
    },
    imagenPerfil: {
        url: 'https://ivvuo.com/assets/img/default/user.png',
        extension: 'png',
    },
    lastLogin: '',
    name: '',
    marca: '',
    password: '',
    repeat_password: '',
    confirmPassword: '',
    newPassword: '',
    role: '',
    singupDate: '',
    perfilConductor: {
        estatus: false,
        licencia: {
            tipo: '',
            numero: '',
            fechaExpedicion: '',
        }
    },
    accesos: {
        tableroControl: true,
        reporteActividades: false
    }
}


