import { Injectable } from '@angular/core';
import DataAccess from "io_connect/connectors/DataAccess.js";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdkService {

  public subject = new BehaviorSubject(null);
  devices$: Observable<any> = this.subject.asObservable();
  public globalSubject = new BehaviorSubject(null);
  globalConfig$: Observable<any> = this.globalSubject.asObservable();
  dataAccess:any;

  constructor() {
    this.dataAccess = new DataAccess({
          userId: '645a159222722a319ca5f5ad',
          dataUrl: 'datads.iosense.io',
          dsUrl: 'ds-server.iosense.io',
          onPrem: false,
          tz: 'UTC',
          logTime: true,
          logger: console
    });
  }

  async getUserInfo(){
    return await this.dataAccess.getUserInfo(false);
  }

}
