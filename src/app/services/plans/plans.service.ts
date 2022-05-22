import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../url/url.service';
import { of } from 'rxjs/observable/of';
// import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlansService {

  private api = this.url.apiRest();

  private path = 'plans/'

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor( private http:HttpClient, private url:UrlService ) { }


  newPlan(plan:any): Observable<any>{
    return this.http.post(this.api+this.path+'newPlan', plan, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getPlans():Observable<any>{
    return this.http.post(this.api+this.path+'getPlans', null,{ headers:this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  deletPlans(id:any):Observable<any>{
    return this.http.post(this.api+this.path+'deletPlans', id, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getPlanById(id:any):Observable<any>{
    return this.http.post(this.api+this.path+'getPlanById/'+id, null, {headers:this.headers})
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
