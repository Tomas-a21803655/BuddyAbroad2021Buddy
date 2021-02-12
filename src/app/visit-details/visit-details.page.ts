import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.page.html',
  styleUrls: ['./visit-details.page.scss'],
})
export class VisitDetailsPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }

}
