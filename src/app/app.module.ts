// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarModule } from 'ngx-snackbar';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsgComponent } from './msg/msg.component';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

// Services
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { ManagerGuardService } from './services/manager-guard.service';
import { AccountGuardService } from './services/account-guard.service';
import { CenterGuardService } from './services/center-guard.service';
import { AccountService } from './services/account/account.service';
import { PlansService } from './services/plans/plans.service';
import { CenterService } from './services/center/center.service';
import { UrlService } from './services/url/url.service';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AccountComponent } from './account/account.component';
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
// import { SupplyConfiComponent } from './dashboard/supply-confi/supply-confi.component';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { ControlCenterComponent } from './account/control-center/control-center.component';
import { CenterAccountComponent } from './account/center-account/center-account.component';
import { CenterAccountListComponent } from './account/center-account/center-account-list/center-account-list.component';
import { RegisterService } from './services/reg/register.service';
import { CityServicesService } from './services/city-services.service';
import { TeamService } from './services/team/team.service';
import { FileUploadModule } from 'ng2-file-upload';
import { TypeService } from './services/types/type.service';
import { CenterSettingComponent } from './dashboard/centers-confi/center-setting/center-setting.component';
import { CustomerService } from './services/customer/customer.service';
import { ServiceByCenterComponent } from './charts/service-by-center/service-by-center.component';
import { ChartService } from './services/chart/chart.service';
import { MembersTeamComponent } from './resources/members/members-team/members-team.component';
import { WorkShopComponent } from './work-shop/work-shop.component';
import { WsDashboardComponent } from './work-shop/ws-dashboard/ws-dashboard.component';
import { WorkShopService } from './services/workshop/work-shop.service';
import { WsOrderDetailsComponent } from './work-shop/ws-order-details/ws-order-details.component';
import { WsCustomerViewComponent } from './work-shop/ws-customer-view/ws-customer-view.component';
import { WorkshopGuardService } from './services/workshop-guard.service';
import { SmsService } from './services/sms/sms.service';
import { ProcessComponent } from './account/process/process.component';
import { ProcessListComponent } from './account/process/process-list/process-list.component';
import { ProcessService } from './services/process/process.service';
import { ProcessDetailsComponent } from './account/process/process-details/process-details.component';
import { SmsConfigComponent } from './resources/sms/sms-config/sms-config.component';
import { ActivityService } from './services/activity/activity.service';
import { IconsService } from './services/icons/icons.service';
import { IconFilterPipe } from './pipe/icon-filter.pipe';
import { AllOrdersComponent } from './account/all-orders/all-orders.component';
import { OrderReportsService } from './services/orderReports/order-reports.service';
import { CountryService } from './services/countrys/country.service';
import { LandingComponent } from './landing/landing.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { InitComponent } from './pages/init/init.component';
import { ListaService } from './services/lista/lista.service';
import { WsCustomerViewV2Component } from './work-shop/ws-customer-view-v2/ws-customer-view-v2.component';
import { ReporteGeneralComponent } from './charts/reporte-general/reporte-general.component';
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { WhatsappTemplatesComponent } from './account/whatsapp-templates/whatsapp-templates.component';
import { VistaResumenProcesoComponent } from './resources/vista-resumen-proceso/vista-resumen-proceso.component';
import { WhatsappConfigComponent } from './resources/whatsappConfiguraciones/whatsapp-config/whatsapp-config.component';
import { ChatComponent } from './resources/chat/chat.component';
import { FooterComponent } from './resources/footer/footer.component';
import { PersonalizacionComponent } from './account/personalizacion/personalizacion.component';
import { ReportesComponent } from './work-shop/reportes/reportes.component';
import { FormularioCotizacionComponent } from './componentes/cotizacion/formulario-cotizacion/formulario-cotizacion.component';
import { WsVistaPorClienteComponent } from './work-shop/ws-vista-por-cliente/ws-vista-por-cliente.component';
import { ItemOrdenesClienteComponent } from './componentes/cliente/item-ordenes-cliente/item-ordenes-cliente.component';
import { WsClienteDetallesComponent } from './work-shop/ws-cliente-detalles/ws-cliente-detalles.component';
import { FormularioClienteComponent } from './componentes/cliente/formulario-cliente/formulario-cliente.component';
import { ClientesService } from './services/cliente/clientes.service';
import { PrecargaComponent } from './componentes/utilitarios/precarga/precarga.component';
import { ResumenCotizacionComponent } from './componentes/cotizacion/resumen-cotizacion/resumen-cotizacion.component';
import { ListadoOrdenesComponent } from './componentes/orden/listado-ordenes/listado-ordenes.component';
import { ListadoSmOrdenesComponent } from './componentes/orden/listado-sm-ordenes/listado-sm-ordenes.component';
import { InicioSesionClienteComponent } from './zonaClientes/inicio-sesion-cliente/inicio-sesion-cliente.component';
import { ZonaClienteComponent } from './zonaClientes/zona-cliente/zona-cliente.component';
import { RegistroClienteComponent } from './zonaClientes/registro-cliente/registro-cliente.component';
import { GeneralClienteComponent } from './zonaClientes/general-cliente/general-cliente.component';
import {
  ListadoOrdenesZonaClienteComponent
} from './componentes/orden/listado-ordenes-zona-cliente/listado-ordenes-zona-cliente.component';
import { ConfirmacionComponent } from './componentes/modales/confirmacion/confirmacion.component';
import {
  ResumenCotizacionZonaClienteComponent
} from './componentes/cotizacion/resumen-cotizacion-zona-cliente/resumen-cotizacion-zona-cliente.component';
import { RecuperarContrasenaClienteComponent } from './zonaClientes/recuperar-contrasena-cliente/recuperar-contrasena-cliente.component';
import { UsuariosComponent } from './account/usuarios/usuarios.component';
import { ItemListaUsuariosComponent } from './componentes/usuarios/item-lista-usuarios/item-lista-usuarios.component';
import { FormularioUsuariosComponent } from './componentes/usuarios/formulario-usuarios/formulario-usuarios.component';
import { FormularioCuentaComponent } from './componentes/cuenta/formulario-cuenta/formulario-cuenta.component';
import { MarcasAdministracionComponent } from './vistas/marcas/marcas-administracion/marcas-administracion.component';
import { MarcaListadoComponent } from './vistas/marcas/marca-listado/marca-listado.component';
import { FormularioMarcaComponent } from './componentes/marcas/formulario-marca/formulario-marca.component';
import { MarcaService } from './services/marca/marca.service';
import { ListadoMarcaComponent } from './componentes/marcas/listado-marca/listado-marca.component';
import { MarcaDetallesComponent } from './vistas/marcas/marca-detalles/marca-detalles.component';
import { InspeccionIconoComponent } from './componentes/iconoPrioridad/inspeccion-icono/inspeccion-icono.component';
import { MarcaClienteComponent } from './vistas/marcas/marca-cliente/marca-cliente.component';
import { CardCentroComponent } from './componentes/centros/card-centro/card-centro.component';
import {
  FormularioCotizacionActividadComponent
} from './componentes/cotizacion/formulario-cotizacion-actividad/formulario-cotizacion-actividad.component';
import { CampanasServicioService } from './services/campanas-servicio/campanas-servicio.service';
import { ReportesCuentaComponent } from './account/reportes-cuenta/reportes-cuenta.component';
import { ReporteService } from './services/reportes/reporte.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MsgComponent,
    AccountComponent,
    MenuComponent,
    AccountConfiComponent,
    NewAccountComponent,
    PlansConfiComponent,
    PlansComponent,
    AccountListComponent,
    AccountDetailsComponent,
    CentersConfiComponent,
    CenterListComponent,
    CenterDetailsComponent,
    ControlCenterComponent,

    CenterAccountComponent,
    CenterAccountListComponent,
    CenterSettingComponent,
    ServiceByCenterComponent,
    MembersTeamComponent,
    WorkShopComponent,
    WsDashboardComponent,
    WsOrderDetailsComponent,
    WsCustomerViewComponent,
    ProcessComponent,
    ProcessListComponent,
    ProcessDetailsComponent,
    SmsConfigComponent,
    IconFilterPipe,
    AllOrdersComponent,
    LandingComponent,
    PrivacyPolicyComponent,
    InitComponent,
    WsCustomerViewV2Component,
    ReporteGeneralComponent,
    WhatsappConfigComponent,
    WhatsappTemplatesComponent,
    VistaResumenProcesoComponent,
    ChatComponent,
    FooterComponent,
    PersonalizacionComponent,
    ReportesComponent,
    FormularioCotizacionComponent,
    WsVistaPorClienteComponent,
    ItemOrdenesClienteComponent,
    WsClienteDetallesComponent,
    FormularioClienteComponent,
    PrecargaComponent,
    ResumenCotizacionComponent,
    ListadoOrdenesComponent,
    ListadoSmOrdenesComponent,
    InicioSesionClienteComponent,
    ZonaClienteComponent,
    RegistroClienteComponent,
    GeneralClienteComponent,
    ListadoOrdenesZonaClienteComponent,
    ConfirmacionComponent,
    ResumenCotizacionZonaClienteComponent,
    RecuperarContrasenaClienteComponent,
    UsuariosComponent,
    ItemListaUsuariosComponent,
    FormularioUsuariosComponent,
    FormularioCuentaComponent,
    MarcasAdministracionComponent,
    MarcaListadoComponent,
    FormularioMarcaComponent,
    ListadoMarcaComponent,
    MarcaDetallesComponent,
    InspeccionIconoComponent,
    MarcaClienteComponent,
    CardCentroComponent,
    FormularioCotizacionActividadComponent,
    ReportesCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    FileUploadModule,
    SnackbarModule.forRoot(),
    Ng2ImgToolsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UrlService,
    UserService,
    AuthGuardService,
    AuthServiceService,
    ManagerGuardService,
    AccountGuardService,
    CenterGuardService,
    AccountService,
    PlansService,
    CenterService,
    RegisterService,
    CityServicesService,
    TeamService,
    TypeService,
    CustomerService,
    ChartService,
    WorkShopService,
    WorkshopGuardService,
    SmsService,
    ProcessService,
    ActivityService,
    IconsService,
    OrderReportsService,
    NgbCarouselConfig,
    CountryService,
    ListaService,
    WhatsappService,
    ClientesService,
    MarcaService,
    CampanasServicioService,
    ReporteService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MsgComponent,
    ConfirmacionComponent
  ]
})
export class AppModule { }
