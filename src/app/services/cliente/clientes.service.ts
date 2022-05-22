import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UrlService } from '../url/url.service';
import { ICliente, IObtener, IEditar } from '../../interfaces/cliente/cliente';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { IRespuesta } from '../../interfaces/respuesta';

@Injectable()
export class ClientesService {

  private api = this.url.mBaas;
  private path = 'cliente/';
  private urlFormada = this.api + this.path;

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor( private http: HttpClient, private url: UrlService ) { }



  obtener( payload: IObtener ): Observable<any> {
    return this.http.post( this.urlFormada + 'obtener', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  editar( payload: IEditar ): Observable<any> {
    return this.http.post( this.urlFormada + 'editar', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  crear( payload: ICliente ): Observable<any> {
    return this.http.post( this.urlFormada + 'crear', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  registroClienteZonaClienteSchema( payload: ICliente ): Observable<any> {
    return this.http.post( this.urlFormada + 'registroClienteZonaClienteSchema', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  iniciarSesion( payload: any ): Observable<any> {
    return this.http.post( this.urlFormada + 'iniciarSesion', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  enviarMensajeRestablecerContrasena( payload: any ): Observable<any> {
    return this.http.post( this.urlFormada + 'enviarMensajeRestablecerContrasena', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  cambiarContrasenaZonaCliente( payload: any ): Observable<any> {
    return this.http.post( this.urlFormada + 'cambiarContrasenaZonaCliente', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

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
