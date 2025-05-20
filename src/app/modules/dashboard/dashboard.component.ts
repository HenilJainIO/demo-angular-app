import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { ALL_WIDGETS } from './dashboard.constant';
import { SdkService } from 'src/app/services/sdk.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  allWidgets = [...ALL_WIDGETS];

  constructor(private sdk: SdkService) {}

  async ngOnInit() {
    const data = await this.sdk.getUserInfo();
    console.error({ data });
    console.error(this.sdk);
  }
}
