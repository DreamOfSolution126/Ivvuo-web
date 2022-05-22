import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UrlService } from '../url/url.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkShopService {

  private api = this.url.apiRest();
  private server = this.url.host();
  private path = 'workshop/';
  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor( private http: HttpClient, private url: UrlService ) { }


  newOrder(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'newOrder', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getOrders(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getOrders', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  countOrders(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'countOrders', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getOrderById(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getOrderById', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'updateOrder', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  sendEmail(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'sendEmail', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  setActivity(order: any): Observable<any> {
    return this.http.post(this.api + this.path + 'setActivityAnswer', order, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getOrderByIdToCustomer(id: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getOrderByIdToCustomer/' + id, null, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerOrdenesTableroControl(payload: any): Observable<any> {
    return this.http.post(this.server + 'orden/' + 'obtenerOrdenesTableroControl', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerNotificacionesWhastapp(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerNotificacionesWhastapp', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }



  actualizaCotizacion(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'actualizaCotizacion', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerOrdenesPorCliente(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerOrdenesPorCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  contarOrdenesPorClienteSinFiltro(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'contarOrdenesPorClienteSinFiltro', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerOrdenesDeCliente(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerOrdenesDeCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerValoresOrdenesCliente(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerValoresOrdenesCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerOrdenesDeClienteZonaCliente(payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerOrdenesDeClienteZonaCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerValoresOrdenesClienteZonaCliente( payload: any): Observable<any> {

    return this.http.post(this.server + 'orden/' + 'obtenerValoresOrdenesClienteZonaCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }


  // Fin de los servicios
  // tslint:disable-next-line: deprecation
  private extractData(res: Response) {
    const body = JSON.stringify(res);
          return body || {};
  }
  // tslint:disable-next-line: deprecation
  private handleErrorObservable (error: Response | any) {
    // console.error(error.message || error);
    return Observable.throw(error || error);
  }

  private log(message: string) {
    console.log('AccountService: ' + message);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
