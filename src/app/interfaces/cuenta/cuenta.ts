export interface ICuenta {
    _id?: string;
    name: string;
    code: string;
    nit: string;
    av: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone_code: number;
    code_country: string;
    telephone: string;
    contacts: Array<IContactosCuenta>;
    plan: string;
    logo: {
        url: string;
        name: string;
        type: string;
    };
    logoNavBar: string;
    whatsapp: {
        estatus: boolean;
        accountSid: string;
        authToken: string;
        numero: string;
    };
    zonaCliente: {
        estatus: boolean;
        ruta: string;
        nombreComercial: string;
    };
    servicioRecogida: {
        estatus: boolean;
    };
    generales: {
        iva: {
          active: boolean;
          value: string;
        };
        video: {
          activo: boolean;
          duracion: number;
        }
      };
    active: boolean;
    created: string;
}

export const cuentaEstadoInicial = {
    _id: '',
    name: '',
    code: '',
    nit: '',
    av: '',
    email: '',
    address: '',
    city: '',
    country: '',
    phone_code: 0,
    code_country: '',
    telephone: '',
    contacts: [{
      name: '',
      position: '',
      telephone: '',
      email: ''
    }],
    plan: '',
    logo: {
        url: '',
        name: '',
        type: '',
    },
    logoNavBar: '',
    whatsapp: {
        estatus: false,
        accountSid: '',
        authToken: '',
        numero: '',
    },
    zonaCliente: {
        estatus: false,
        ruta: '',
        nombreComercial: '',
    },
    servicioRecogida: {
        estatus: false
    },
    generales: {
        iva: {
          active: false,
          value: '0'
        },
        video: {
          activo: false,
          duracion: 20
        }
      },
    active: false,
    created: ''
}

export interface IContactosCuenta {
  name: string;
  telephone: string;
  position: string;
  email: string;
}
