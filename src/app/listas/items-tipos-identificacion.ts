import { TipoIdentificacion } from '../enum/tipo-identificacion.enum';

export const listaTiposIdentificacion = [
    {
        valor: TipoIdentificacion.CEDULA_CIUDADANIA,
        nombre: 'Cedula ciudadania'
    },
    {
        valor: TipoIdentificacion.CEDULA_EXTRANJERIA,
        nombre: 'Cedula extranjeria'
    },
    {
        valor: TipoIdentificacion.NIT,
        nombre: 'Numero Id Tributaria'
    },
    {
        valor: TipoIdentificacion.PASAPORTE,
        nombre: 'Pasaporte'
    }
];
