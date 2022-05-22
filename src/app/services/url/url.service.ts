import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UrlService {

  /*
  *
  * Active URL while mode developer is on
  *
  */

  private api = environment.api;
  private orden = environment.orden;
  private server = environment.server;
  private urlDomain = environment.urlDomain;
  private url = environment.url;
  public mBaas = environment.mBaas;

  private center = new Subject<any>();

  constructor() { }

  setCenterSelect = ( center: any ) => {
      this.center.next(center);
  }

  getCenterSelect = ( ): Observable<any> => {
    return this.center.asObservable();
}

  apiRest(): string {
    return this.api;
  }

  ordenPath(): string {
    return this.orden;
  }

  host(): string {
    return this.server;
  }

  domain(): string {
    return this.urlDomain;
  }

  getServer(): string {
    return this.url;
  }

}
