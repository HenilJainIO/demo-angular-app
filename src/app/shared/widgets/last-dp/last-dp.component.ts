import { SdkService } from 'src/app/services/sdk.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-last-dp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-dp.component.html',
  styleUrls: ['./last-dp.component.scss']
})
export class LastDpComponent {

  @Input('config') config:any;
  devices:any[] = [];
  lastDPData:any[] = [];
  currentConfig : any = {};

  constructor(
    private _sdkService : SdkService
  ){

  }

  ngOnInit(){
    this._sdkService.globalConfig$.subscribe(async (resp) => {
      if(resp){
        this.currentConfig = resp;
        await this.fetchDP();
      }
    })
  }

  async fetchDP(){
    const {device,sensors,startTime,endTime} = this.currentConfig;
    const data = await this._sdkService.dataAccess.getDp({ deviceId: device, sensorList: sensors , n: 1, startTime ,endTime });
    this.lastDPData = [...data];
  }
}
