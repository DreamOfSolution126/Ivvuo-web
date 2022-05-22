import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../url/url.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {
  private api = this.url.apiRest();
  private host = this.url.host();
  private domain = this.url.domain();
  private path = 'customer/';

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor(private http: HttpClient, private url: UrlService) { }

  newCustomer(customer: any): Observable<any> {
    return this.http.post(this.api + this.path + 'newCustomer', customer, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getCustomerByPlate(customer: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCustomerByPlate', customer, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getCustomerByNit(customer: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCustomerByNit', customer, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getCustomerByFilter(filter: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCustomerByFilter', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getCountCustomerByFilter(filter: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCountCustomerByFilter', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerIdOrden ( data: any): Observable<any> {
    return this.http.post(this.host + 'cliente/obtenerIdOrden', data, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }


  // Fin de los servicios
  private extractData(res: Response) {
    const body = JSON.stringify(res);
          return body || {};
  }
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
