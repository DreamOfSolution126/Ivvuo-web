import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UrlService } from './url/url.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

	private api = this.url.apiRest();

  constructor(private http: HttpClient, private url: UrlService) { }

  singUp(user: any): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'users/signUp', user, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  singIn(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + 'noToken' });
    return this.http.post(this.api + 'signin', user, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getUserByEmail(user: any): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'getuserbyemail', user, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getUsers(): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'users/getUsers', null, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  // updateUser(user:any): Observable<any>{
  //   let userId = user._id
  //   let userToken =  JSON.parse(localStorage.getItem('token'));
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
  //   return this.http.post(this.api+'users/'+userId, user, {headers:headers})
  //   .map(this.extractData)
  //   .catch(this.handleErrorObservable)
  // }

  deletUser(user: any ): Observable<any> {
    const userId = user._id;
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post( this.api + 'deletUser/' + userId, user, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getNewPass(user: any): Observable<any> {
    const userToken = null;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'mail/getNewPass', user, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getUserById(id: any): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + '/users/getUserById/' + id, null, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  upDateUser(user: any): Observable<any> {
    const id = user._id;
    const body = user;
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + '/users/upDateUser/' + id, body, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerUsuariosPorCentro(user: any): Observable<any> {
    const id = user._id;
    const body = user;
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'usuarios/obtenerUsuariosPorCentro', body, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerUsuariosPorCuenta( payload: any): Observable<any> {

    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'usuarios/obtenerUsuariosPorCuenta', payload, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  contarUsuarios(): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'usuarios/contarUsuarios', null, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerUsuarioPorMarca( payload ): Observable<any> {
    const userToken =  JSON.parse(localStorage.getItem('token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + userToken });
    return this.http.post(this.api + 'usuarios/obtenerUsuarioPorMarca', payload, {headers: headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

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
