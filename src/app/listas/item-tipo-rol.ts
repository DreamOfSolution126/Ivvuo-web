import { TipoRol } from '../enum/tipo-rol.enum';
import { ILista } from '../interfaces/listas';

export const listaRoles: ILista[] = [
    {
        valor: TipoRol.ADMINISTRADOR_CUENTA,
        nombre: 'Administrador Cuenta'
    },
    {
        valor: TipoRol.CENTRO_SERVICIO,
        nombre: 'Centro de servicio'
    },
    {
        valor: TipoRol.MANAGER,
        nombre: 'Manager'
    },
    {
        valor: TipoRol.REPRESENTANTE_MARCA,
        nombre: 'Representante de marca'
    },

]