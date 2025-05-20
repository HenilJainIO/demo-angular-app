import { Component, Input } from '@angular/core';
import { BarChartComponent } from '../../../shared/widgets/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/widgets/data-table/data-table.component';
import { LastDpComponent } from '../../../shared/widgets/last-dp/last-dp.component';
import { LineChartComponent } from '../../../shared/widgets/line-chart/line-chart.component';
import { PieChartComponent } from '../../../shared/widgets/pie-chart/pie-chart.component';
import { TextComponent } from '../../../shared/widgets/text/text.component';
import { ImageComponent } from 'src/app/shared/widgets/image/image.component';
import { SdkService } from 'src/app/services/sdk.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import * as moment from 'moment';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss'],
  imports: [
    BarChartComponent,
    CommonModule,
    DataTableComponent,
    LastDpComponent,
    LineChartComponent,
    PieChartComponent,
    TextComponent,
    ImageComponent,
    FormsModule,
    NgSelectModule,
  ],
  standalone: true,
})
export class ViewDashboardComponent {
  @Input('allWidgets') allWidgets: any[] = [];
  allDevices: any[] = [];
  selectedDevice: string = '';
  allSensors: any[] = [];
  selectedSensors: string[] = [];
  timePeriods = [
    'Today',
    'Yesterday',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
  ];
  currentTimePeriod: string = 'Last week';

  constructor(private _sdk: SdkService) {}

  ngOnInit() {
    this._sdk.devices$.subscribe((resp) => {
      if (resp) {
        this.allDevices = [...resp];
        this.selectedDevice = 'APRPLC_A3';
        this.selectedSensors = ['D19','D20'];
        this.emitAllValues();
      }
    });
  }

  async patchFirstDevice(init: boolean = false) {
    const deviceMetaData = await this._sdk.dataAccess.getDeviceMetaData(
      this.selectedDevice,
      false
    );
    if (deviceMetaData) {
      this.allSensors = deviceMetaData?.sensors;
      this.selectedSensors = [
        this.allSensors[0]?.sensorId,
        this.allSensors[1]?.sensorId,
      ];
      if (init) this.emitAllValues();
    }
  }

  emitAllValues() {
    const objectToEmit = {
      device: this.selectedDevice,
      sensors: this.selectedSensors,
      ...this.getTimeRange(),
    };
    this._sdk.globalSubject.next(objectToEmit as any);
  }

  getTimeRange() {
    const now = moment(),
      period = this.currentTimePeriod;
    let start, end;

    switch (period.toLowerCase()) {
      case 'today':
        start = moment().startOf('day');
        end = moment().endOf('day');
        break;
      case 'yesterday':
        start = moment().subtract(1, 'day').startOf('day');
        end = moment().subtract(1, 'day').endOf('day');
        break;
      case 'this week':
        start = moment().startOf('week');
        end = moment().endOf('week');
        break;
      case 'last week':
        start = moment().subtract(1, 'week').startOf('week');
        end = moment().subtract(1, 'week').endOf('week');
        break;
      case 'this month':
        start = moment().startOf('month');
        end = moment().endOf('month');
        break;
      case 'last month':
        start = moment().subtract(1, 'month').startOf('month');
        end = moment().subtract(1, 'month').endOf('month');
        break;
      case 'this year':
        start = moment().startOf('year');
        end = moment().endOf('year');
        break;
      case 'last year':
        start = moment().subtract(1, 'year').startOf('year');
        end = moment().subtract(1, 'year').endOf('year');
        break;
      default:
        throw new Error('Invalid time period');
    }

    return {
      startTime: start.valueOf(),
      endTime: end.valueOf(),
    };
  }
}
