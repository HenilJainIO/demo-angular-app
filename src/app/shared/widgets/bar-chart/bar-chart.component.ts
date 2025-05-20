import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Highcharts Required Imports
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { SdkService } from 'src/app/services/sdk.service';
import * as moment from 'moment';
declare let require: any;
require("../../../../assets/no-data.js")(Highcharts);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule,DragAndDropModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  showLoader: boolean = true;
  chartData: any[] = [];
  chartOptions: any = {};
  highcharts = Highcharts;
  currentConfig : any;

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
    this.chartData = await this._sdkService.dataAccess.dataQuery({ deviceId: device, sensorList:sensors, startTime  , endTime   });
    console.error("BAR CHART DATA",this.chartData);
    this.formatChartData();
  }

  formatChartData(){
    let mainData :any[] = [];
    this.chartData.forEach((data,mainIndex) => {
      this.currentConfig.sensors.forEach((sensor : any,index :number )=>{
        if(!mainData[index]){
          mainData[index] = {
            name : sensor,
            data : []
          }
        };
        mainData[index].data.push([moment(data.timestamp).unix(),Number(data[sensor])]);
      })
    });
    this.drawChart(mainData);
  }

  drawChart(mainData:any) {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: this.currentConfig.sensors.join(',') + ' Bar Chart Data',
      },
      subtitle: {
        text:'',
      },
      xAxis: {
        type: 'datetime',
        title: {
            text: 'Time',
            useUTC : true
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Y Axis Title',
        },
      },
      tooltip: {
        valueSuffix: ' Unit',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      credits : {
        enabled : false
      },
      series: [
        ...mainData
      ],
    };
    this.showLoader = false;
  }

  dragEnd(event : any){
    if (this.config.position) {
      this.config.position.x += event.y; // $event.y: Diff in start & end Y values
      this.config.position.y += event.x; // $event.x: Diff in start & end X values
    } else {
      this.config["position"] = {
        x: 0,
        y: 0,
      };
      this.config.position.x = event.y;
      this.config.position.y = event.x;
    }
  }
}
