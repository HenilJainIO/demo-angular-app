import { Component } from '@angular/core';
import DataAccess from "io_connect/connectors/DataAccess.js";
import { SdkService } from './services/sdk.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sdk-demo';

  constructor(
    private _sdkService : SdkService
  ){

  }

  async ngOnInit(){
    const devices = await this._sdkService.dataAccess.getDeviceDetails(false);
    this._sdkService.subject.next(devices);
  }
}
