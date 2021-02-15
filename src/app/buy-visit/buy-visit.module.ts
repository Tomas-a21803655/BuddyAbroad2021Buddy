import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyVisitPageRoutingModule } from './buy-visit-routing.module';

import { BuyVisitPage } from './buy-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyVisitPageRoutingModule
  ],
  declarations: [BuyVisitPage]
})
export class BuyVisitPageModule {}
