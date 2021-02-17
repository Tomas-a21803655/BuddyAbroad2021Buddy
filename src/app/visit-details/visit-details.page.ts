import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.page.html',
  styleUrls: ['./visit-details.page.scss'],
})
export class VisitDetailsPage implements OnInit {

  public trip: HomeTripCardsModel;


  constructor(private router: Router,private navCtrl:NavController,
              public fireStorageService: FireStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const tripId: string = this.route.snapshot.paramMap.get('id');
    this.fireStorageService.getTripDetail(tripId).subscribe(trip => {
      this.trip = trip;
    });
  }

  goback() {
    this.navCtrl.pop();
  }
}
