import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { SdkService } from 'src/app/services/sdk.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule,HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  showLoader: boolean = true;
  chartData: any[] = [];
  chartOptions: any = {};
  highcharts = Highcharts;

  @Input('config') config:any;
  currentConfig : any;

  constructor(
    private _sdkService : SdkService
  ) {}

  ngOnInit() {
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
    this.chartData = [...data];
    this.drawChart();
  }

  drawChart() {
    const data = this.chartData.map((x) => {
      return {y : Number(x.value), name : x.sensor}
    })
    this.chartOptions =
    {
      chart: {
          type: 'pie',
          zooming: {
              type: 'xy'
          },
          panning: {
              enabled: true,
              type: 'xy'
          },
          panKey: 'shift'
      },
      title: {
          text: this.currentConfig.sensors.join(',')
      },
      tooltip: {
          valueSuffix: ''
      },
      subtitle: {
          text:''
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data
          }
      ]
    };
    this.showLoader = false;
  }


}


