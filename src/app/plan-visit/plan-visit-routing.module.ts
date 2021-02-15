import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanVisitPage } from './plan-visit.page';

const routes: Routes = [
  {
    path: '',
    component: PlanVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanVisitPageRoutingModule {}
