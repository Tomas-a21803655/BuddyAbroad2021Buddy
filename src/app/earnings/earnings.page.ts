import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {switchMap, takeUntil} from 'rxjs/operators';
import {FireStorageService} from '../fire-storage.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {

   public userEarnings;


  constructor(public fireStorageService: FireStorageService,public af: AngularFirestore) { }

  ngOnInit() {
    this.fireStorageService.getUserDocInfo().subscribe((data) => {
     this.userEarnings = data.earnings;
    });
  }


}

