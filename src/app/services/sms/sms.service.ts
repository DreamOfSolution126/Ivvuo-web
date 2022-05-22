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
export class SmsService {

  private api = this.url.apiRest();
  private path = 'sms/';
  

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken});
  constructor( private http:HttpClient, private url:UrlService ) { }


  sendSMS(order:any):Observable<any>{
    return this.http.post(this.api+this.path+'sendSMS', order, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  createSMSTemplate(sms:any):Observable<any>{
    return this.http.post(this.api+this.path+'createSMSTemplate', sms, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getByAccountSMSTemplate(filter:any):Observable<any>{
    return this.http.post(this.api+this.path+'getByAccountSMSTemplate', filter, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  updateSMSTemplate(sms:any):Observable<any>{
    return this.http.post(this.api+this.path+'updateSMSTemplate', sms, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  deletSMSTemplate(sms:any):Observable<any>{
    return this.http.post(this.api+this.path+'deletSMSTemplate', sms, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  updateOneSMSTemplate(sms:any):Observable<any>{
    return this.http.post(this.api+this.path+'updateOneSMSTemplate', sms, {headers:this.headers})
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
