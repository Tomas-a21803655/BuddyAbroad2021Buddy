import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyVisitPage } from './buy-visit.page';

const routes: Routes = [
  {
    path: '',
    component: BuyVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyVisitPageRoutingModule {}
