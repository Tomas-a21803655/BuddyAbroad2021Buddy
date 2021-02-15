import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-buy-visit',
  templateUrl: './buy-visit.page.html',
  styleUrls: ['./buy-visit.page.scss'],
})
export class BuyVisitPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }
}
