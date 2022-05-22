import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UrlService } from '../url/url.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReporteService {

  private api = this.url.mBaas;
  private path = 'reportes-excel/';
  userToken =  JSON.parse(localStorage.getItem('token'));
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http: HttpClient, private url: UrlService ) { }

  reporteActividades ( payload: IReporteActividades ): Observable<any> {
    try {
      return this.http.get(this.api + this.path + `reporteActvidades?id=${
        payload.id
      }&desde=${
        payload.desde
      }&hasta=${
        payload.hasta
      }`, {headers: this.headers });
    } catch (error) {
      return error;
    }
  }
}

export interface IReporteActividades {
  id: string;
  desde: string;
  hasta: string;
}
