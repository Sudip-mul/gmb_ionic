import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyreportPageRoutingModule } from './monthlyreport-routing.module';

import { MonthlyreportPage } from './monthlyreport.page';
// import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyreportPageRoutingModule
  ],
  declarations: [MonthlyreportPage]
})
export class MonthlyreportPageModule {}
