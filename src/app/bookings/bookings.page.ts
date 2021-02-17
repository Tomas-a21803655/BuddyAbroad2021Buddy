import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  public homeTripCards: Observable<Array<HomeTripCardsModel>>;

  constructor(public fireStorageService: FireStorageService,private router: Router, public db: AngularFirestore) {
  }

  ngOnInit() {
    this.homeTripCards = this.fireStorageService.getUserTrips();
    console.log(this.homeTripCards);
  }

  public openVisitDetailsPage(): void {
    this.router.navigate(['/visit-details']);
  }

  public async removeTrip(slidingItem: IonItemSliding, trip: HomeTripCardsModel, index: number): Promise<void> {
    await this.fireStorageService.deleteTrip(trip.id);
    return await slidingItem.close();
  }
}
