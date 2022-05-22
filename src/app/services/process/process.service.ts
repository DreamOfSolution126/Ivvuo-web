import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../url/url.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProcessService {

  private api = this.url.apiRest();

  private path = 'process/'

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor( private http:HttpClient, private url:UrlService ) { }


  createList(list:any):Observable<any>{
    return this.http.post(this.api+this.path+'createList', list, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getList(filter:any):Observable<any>{
    return this.http.post(this.api+this.path+'getList', filter, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  
  getListById(list:any):Observable<any>{
    return this.http.post(this.api+this.path+'getListById', list, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  
  editList(list:any):Observable<any>{
    return this.http.post(this.api+this.path+'editList', list, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  deletList(list:any):Observable<any>{
    return this.http.post(this.api+this.path+'deletList', list, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  createProcess(process:any):Observable<any>{
    return this.http.post(this.api+this.path+'createProcess', process, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getProcess(filter:any):Observable<any>{
    return this.http.post(this.api+this.path+'getProcess', filter, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  deletProcess(activity:any):Observable<any>{
    return this.http.post(this.api+this.path+'deletProcess', activity, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  editProcess(process:any):Observable<any>{
    return this.http.post(this.api+this.path+'editProcess', process, {headers:this.headers})
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
