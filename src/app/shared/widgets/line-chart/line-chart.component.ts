import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { SdkService } from 'src/app/services/sdk.service';
import * as moment from 'moment';
declare let require: any;
require("../../../../assets/no-data.js")(Highcharts);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule,HighchartsChartModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  showLoader: boolean = true;
  chartData: any[] = [];
  chartOptions: any = {};
  highcharts = Highcharts;
  currentConfig:any;

  @Input('config') config:any;

  constructor(
    private _sdkService : SdkService
  ) {}

  async ngOnInit() {
    this._sdkService.globalConfig$.subscribe(async (resp) => {
      if(resp){
        this.currentConfig = resp;
        await this.fetchData();
      }
    })
  }

  async fetchData(){
    const {device,sensors,startTime,endTime} = this.currentConfig;
    this.chartData = await this._sdkService.dataAccess.dataQuery({ deviceId: device, sensorList:sensors, startTime : startTime  , endTime : endTime });
    console.error("LINE CHART DATA",this.chartData);
    this.formatChartData();
  }

  formatChartData(){
    let mainData :any[] = [],categories : any = [];
    this.chartData.forEach((data,mainIndex) => {
      this.currentConfig.sensors.forEach((sensor : any,index :number )=>{
        if(!mainData[index]){
          mainData[index] = {
            name : sensor,
            data : []
          }
        };
        mainData[index].data.push(Number(data[sensor]));
      });
      categories.push(moment(data.timestamp).format('LT'));
    });
    this.drawChart(mainData,categories);
  }

  drawChart(seriesData : any[],categories : any[]) {
    console.error({seriesData})
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
          text: this.currentConfig.sensors.join(',') + ' Line Data',
      },

      subtitle: {
          text: '',
          align: 'left'
      },
      xAxis : {
        categories
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      series: [...seriesData],
      credits : {
        enabled : false
      }
  }
    this.showLoader = false;
  }
}
