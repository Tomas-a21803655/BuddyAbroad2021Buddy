import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {FireStorageService} from '../fire-storage.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(public fireStorageService: FireStorageService,private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }

  public async addItem(): Promise<void> {
    const theNewTask: string = prompt('New Trip');
    if (theNewTask !== '') {
      const trip: HomeTripCardsModel = {
        name: theNewTask,
        image: 'assets/logoandname.png',
        description: 'This is a test',
        price: 99,
        time: 3,
        rating: 0,
      };
      await this.fireStorageService.createTrip(trip);
    }
  }

}
