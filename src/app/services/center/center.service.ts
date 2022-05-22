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
export class CenterService {

  private api = this.url.apiRest();

  private path = 'center/';

  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  constructor(private http: HttpClient, private url: UrlService) { }



  newCenter(center: any): Observable<any> {
    return this.http.post(this.api + this.path + 'newCenter', center, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  countCenter(): Observable<any> {
    return this.http.post(this.api + this.path + 'centerCount', null, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  // Obtener los centros de servicio para una cuenta
  getCenterById(id: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCenterById', id, {headers: this.headers} )
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  // Contar los centros de servicio de una cuenta
  getCountCenterById(body: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getCountCenterById', body, {headers: this.headers} )
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  editCenter(id: any): Observable<any> {
    return this.http.post(this.api + this.path + 'editCenter', id, {headers: this.headers} )
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getCenters(filter: any) {
    return this.http.post(this.api + this.path + 'getCenters', filter, {headers: this.headers} )
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  findCenterById(id: any): Observable<any> {
    return this.http.post(this.api + this.path + 'findCenterById/' + id, null, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  findCentersById(user: any): Observable<any> {
    return this.http.post(this.api + this.path + 'findCentersById', user, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  //List Service
  getOneListService(body: any): Observable<any> {
    return this.http.post(this.api + 'list/' + 'getOneListService', body, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  newListService(body: any): Observable<any> {
    return this.http.post(this.api + 'list/' + 'newListService', body, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  UpdateListService(list: any): Observable<any> {
    return this.http.post(this.api + 'list/' + 'UpdateListService', list, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getDataCenterToId(id: any): Observable<any> {
    return this.http.post(this.api + this.path + 'getDataCenterToId', id, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  obtenerMultiplesCentros( centros: any): Observable<any> {
    return this.http.post(this.api + this.path + 'obtenerMultiplesCentros', centros, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  consultaListaCentros( centros: any): Observable<any> {
    return this.http.post(this.api + this.path + 'consultaListaCentros', centros, {headers: this.headers})
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
