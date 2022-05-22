import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  private api = this.url.apiRest();

  private path = 'vehicles/'

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor( private http:HttpClient, private url:UrlService ) { }


  getVehicleByPlate(plate):Observable<any>{
    return this.http.post(this.api+this.path+'getVehicleByPlate', plate, {headers:this.headers})
    .map( this.extractData )
    .catch( this.handleErrorObservable )
  }

  newService(reg:any):Observable<any>{
    return this.http.post(this.api+'reg/newService', reg, {headers:this.headers})
    .map( this.extractData )
    .catch(this.handleErrorObservable)
  }

  getHistoryToCenter(filter:any):Observable<any>{
    return this.http.post(this.api+'reg/getHistoryToCenter', filter, {headers:this.headers})
    .map( this.extractData )
    .catch(this.handleErrorObservable)
  }

  countHistoryToCenter(filter:any):Observable<any>{
    return this.http.post(this.api+'reg/countHistoryToCenter', filter, {headers:this.headers})
    .map( this.extractData )
    .catch(this.handleErrorObservable)
  }

  getTypesFromRegServices():Observable<any>{
    return this.http.post(this.api+'reg/getTypesFromRegServices', null, {headers:this.headers})
    .map( this.extractData )
    .catch(this.handleErrorObservable)
  }

  getRegServiceById(reg:any):Observable<any>{
    return this.http.post(this.api+'reg/getRegServiceById', reg, {headers:this.headers})
    .map( this.extractData )
    .catch(this.handleErrorObservable)
  }

  updateService(service:any):Observable<any>{
    return this.http.post(this.api+'reg/updateService', service, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
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
