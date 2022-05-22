import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UrlService } from '../url/url.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { IMarca, IConsultaPorId } from '../../interfaces/marca/marca';

@Injectable()
export class MarcaService {

  private api = this.url.mBaas;
  private path = 'marca/';
  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http: HttpClient, private url: UrlService ) { }

  actualizar ( payload: IMarca ): Observable<any> {
    return this.http.post(this.api + this.path + 'actualizar', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  crear ( payload: IMarca ): Observable<any> {
    return this.http.post(this.api + this.path + 'crear', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  consulta ( ): Observable<any> {
    return this.http.post(this.api + this.path + 'consulta', null, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  consultaPorId ( payload: IConsultaPorId ): Observable<any> {
    return this.http.post(this.api + this.path + 'consultaPorId', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  consultaPorIdCentros ( payload: IConsultaPorId ): Observable<any> {
    return this.http.post(this.api + this.path + 'consultaPorIdCentros', payload, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  reporte ( ): Observable<any> {
    return this.http.post(this.api + this.path + 'reporte', null, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }




  // Fin de los servicios
  // tslint:disable-next-line: deprecation
  private extractData(res: Response ) {
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
