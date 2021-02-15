import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }

}
