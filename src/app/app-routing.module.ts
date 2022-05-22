import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


// Servicios
import { AuthGuardService} from './services/auth-guard.service';
import { ManagerGuardService } from './services/manager-guard.service';
import { AccountGuardService } from './services/account-guard.service';
import { CenterGuardService } from './services/center-guard.service';
import { WorkshopGuardService } from './services/workshop-guard.service';


// Components
import { AccountComponent } from '../app/account/account.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { AccountConfiComponent } from './dashboard/account-confi/account-confi.component';
import { NewAccountComponent } from './dashboard/account-confi/new-account/new-account.component';
import { PlansConfiComponent } from './dashboard/plans-confi/plans-confi.component';
import { PlansComponent } from './dashboard/plans-confi/plans/plans.component';
import { AccountListComponent } from './dashboard/account-confi/account-list/account-list.component';
import { AccountDetailsComponent } from './dashboard/account-confi/account-details/account-details.component';
import { CentersConfiComponent } from './dashboard/centers-confi/centers-confi.component';
import { CenterListComponent } from './dashboard/centers-confi/center-list/center-list.component';
import { CenterDetailsComponent } from './dashboard/centers-confi/center-details/center-details.component';
import { ControlCenterComponent } from './account/control-center/control-center.component';
import { CenterAccountComponent } from './account/center-account/center-account.component';
import { CenterAccountListComponent } from './account/center-account/center-account-list/center-account-list.component';
import { WorkShopComponent } from './work-shop/work-shop.component';
import { WsDashboardComponent } from './work-shop/ws-dashboard/ws-dashboard.component';
import { WsOrderDetailsComponent } from './work-shop/ws-order-details/ws-order-details.component';
import { WsCustomerViewComponent } from './work-shop/ws-customer-view/ws-customer-view.component';
import { ProcessComponent } from './account/process/process.component';
import { ProcessListComponent } from './account/process/process-list/process-list.component';
import { ProcessDetailsComponent } from './account/process/process-details/process-details.component';
import { SmsConfigComponent } from './resources/sms/sms-config/sms-config.component';
import { AllOrdersComponent } from './account/all-orders/all-orders.component';
import { LandingComponent } from './landing/landing.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { InitComponent } from './pages/init/init.component';
import { WsCustomerViewV2Component } from './work-shop/ws-customer-view-v2/ws-customer-view-v2.component';

import { WhatsappConfigComponent } from './resources/whatsappConfiguraciones/whatsapp-config/whatsapp-config.component';
import { WhatsappTemplatesComponent } from './account/whatsapp-templates/whatsapp-templates.component';
import { VistaResumenProcesoComponent } from './resources/vista-resumen-proceso/vista-resumen-proceso.component';
import { PersonalizacionComponent } from './account/personalizacion/personalizacion.component';
import { ReportesComponent } from './work-shop/reportes/reportes.component';
import { WsVistaPorClienteComponent } from './work-shop/ws-vista-por-cliente/ws-vista-por-cliente.component';
import { WsClienteDetallesComponent } from './work-shop/ws-cliente-detalles/ws-cliente-detalles.component';
import { InicioSesionClienteComponent } from './zonaClientes/inicio-sesion-cliente/inicio-sesion-cliente.component';
import { ZonaClienteComponent } from './zonaClientes/zona-cliente/zona-cliente.component';
import { RegistroClienteComponent } from './zonaClientes/registro-cliente/registro-cliente.component';
import { GeneralClienteComponent } from './zonaClientes/general-cliente/general-cliente.component';
import { RecuperarContrasenaClienteComponent } from './zonaClientes/recuperar-contrasena-cliente/recuperar-contrasena-cliente.component';
import { UsuariosComponent } from './account/usuarios/usuarios.component';
import { MarcasAdministracionComponent } from './vistas/marcas/marcas-administracion/marcas-administracion.component';
import { MarcaListadoComponent } from './vistas/marcas/marca-listado/marca-listado.component';
import { MarcaDetallesComponent } from './vistas/marcas/marca-detalles/marca-detalles.component';
import { MarcaClienteComponent } from './vistas/marcas/marca-cliente/marca-cliente.component';
import { ReportesCuentaComponent } from './account/reportes-cuenta/reportes-cuenta.component';

// import { WsClienteReporteInspeccionComponent } from './work-shop/ws-cliente-reporte-inspeccion/ws-cliente-reporte-inspeccion.component';

const routes: Routes = [

  { path: 'public', component : LandingComponent, children: [
    { path: 'inicio', component: InitComponent},
    { path: 'login', component: LoginComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [ManagerGuardService], children: [
    { path: 'menu', component: MenuComponent},
    { path: 'accountConfi', component: AccountConfiComponent, children: [
      { path: 'newAccount', component: NewAccountComponent},
      { path: 'accountList', component: AccountListComponent },
      { path: 'accountDetails/:id', component: AccountDetailsComponent},
      { path: '', redirectTo: 'accountList', pathMatch: 'full' }
    ]},
    { path: 'plansConfi', component: PlansConfiComponent, children: [
      { path: 'plans', component: PlansComponent },
      { path: '', redirectTo: 'plans', pathMatch: 'full'}
    ]},
    { path: 'centersConfi', component: CentersConfiComponent, children: [
      { path: 'centerList', component: CenterListComponent },
      { path: 'centerDetails/:id', component: CenterDetailsComponent},
      { path: '', redirectTo: 'centerList', pathMatch: 'full'}
    ]},
    { path: 'marca-administrador', component: MarcasAdministracionComponent, children:[
      { path: 'listado', component: MarcaListadoComponent },
      { path: 'detalles/:id', component: MarcaDetallesComponent },
      { path: '', redirectTo: 'listado', pathMatch: 'full'}
    ] },
    { path: '', redirectTo: 'menu', pathMatch: 'full'}
  ]},
  { path: 'account_manager', component: AccountComponent, canActivate: [AccountGuardService], children: [
    { path: 'controlCenter', component: ControlCenterComponent},
    { path: 'orders', component: AllOrdersComponent},
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'center', component: CenterAccountComponent, children: [
      { path: 'centerDetails/:id', component: CenterDetailsComponent},
      { path: 'list', component: CenterAccountListComponent},
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]},
    { path: '', redirectTo: 'controlCenter', pathMatch: 'full' },
    { path: 'process', component: ProcessComponent, children: [
      // { path:'newProcess', component:NewProcessComponent},
      { path: 'processList', component: ProcessListComponent },
      { path: 'details/:id', component: ProcessDetailsComponent},
      { path: '', redirectTo: 'processList', pathMatch: 'full'}
    ]},
    { path: 'sms', component: SmsConfigComponent},
    { path: 'whatsapp-template', component: WhatsappTemplatesComponent},
    { path: 'personalizacion', component: PersonalizacionComponent },
    { path: 'reportes', component: ReportesCuentaComponent}
  ] },
  { path: 'workshop_center', component: WorkShopComponent, canActivate: [WorkshopGuardService], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard/:id', component: WsDashboardComponent},
    { path: 'vistaPorClientes/:id', component: WsVistaPorClienteComponent },
    { path: 'Orderdetails/:id', component: WsOrderDetailsComponent},
    { path: ':idCentro/ClienteDetalles/:id', component: WsClienteDetallesComponent},
    { path: 'reportes', component: ReportesComponent }
  ]},
  { path: 'marca', component: MarcaClienteComponent },
  { path: 'customer/:id', component: WsCustomerViewComponent},
  { path: 'C/:codigo', component: WsCustomerViewV2Component},
  { path: 'vistaResumen', component: VistaResumenProcesoComponent },
  { path: '', redirectTo: 'public', pathMatch: 'full'},
  { path: '*', redirectTo: 'public', pathMatch: 'full'},
  { path: ':rutaCuenta', component: ZonaClienteComponent, children: [
    { path: 'inicioSesion', component: InicioSesionClienteComponent },
    { path: 'registro', component: RegistroClienteComponent },
    { path: 'principal', component: GeneralClienteComponent},
    { path: '', redirectTo: 'inicioSesion', pathMatch: 'full'},
  ] },
  { path: 'recuperarContrasena/:token', component: RecuperarContrasenaClienteComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
