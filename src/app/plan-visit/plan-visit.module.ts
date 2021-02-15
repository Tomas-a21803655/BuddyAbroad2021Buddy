import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanVisitPageRoutingModule } from './plan-visit-routing.module';

import { PlanVisitPage } from './plan-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanVisitPageRoutingModule
  ],
  declarations: [PlanVisitPage]
})
export class PlanVisitPageModule {}
