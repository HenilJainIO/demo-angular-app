import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';

const routes : Routes = [
  {
    path : '',
    component : DashboardComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ViewDashboardComponent,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class DashboardModule { }
