import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plan-visit',
  templateUrl: './plan-visit.page.html',
  styleUrls: ['./plan-visit.page.scss'],
})
export class PlanVisitPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }

  public openBuyVisitPage(): void {
    this.router.navigate(['/buy-visit']);
  }

}
