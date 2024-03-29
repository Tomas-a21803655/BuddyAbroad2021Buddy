import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-visit-details',
    templateUrl: './visit-details.page.html',
    styleUrls: ['./visit-details.page.scss'],
})
export class VisitDetailsPage implements OnInit {

    public trip: HomeTripCardsModel;
    public allUsersEnrolled: any = [];
    public allUsersEnrolledInfo: any = [];
    public buttonTextArray: any = [];
    public tripId: string = this.route.snapshot.paramMap.get('id');


    constructor(private router: Router, private navCtrl: NavController,
                public fireStorageService: FireStorageService,
                private route: ActivatedRoute, public db: AngularFirestore) {
    }

    ngOnInit() {
        const tripId: string = this.route.snapshot.paramMap.get('id');
        this.fireStorageService.getTripDetail(tripId).subscribe(trip => {
            this.trip = trip;
        });
        this.db.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.getEnrolledUsers(doc.id);
                });
            });
    }

    public getEnrolledUsers(targetUser): Subscription {
        return this.db.collection('users').doc(targetUser).collection('buddyScheduledTrips').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    if (data.orderedTripId === this.tripId) {
                        this.getEnrolledUserInfo(data.orderedBy);
                        this.allUsersEnrolled.push(doc.data());
                        if (data.status === 'Booked') {
                            this.buttonTextArray.push('End Trip');
                        } else if (data.status === 'Pending') {
                            this.buttonTextArray.push('Approve');
                        } else {
                            this.buttonTextArray.push('Completed');
                        }
                        console.log(this.buttonTextArray)
                    }
                });
            });
    }

    public getEnrolledUserInfo(targetUser): any {
        this.db.collection('users').doc(targetUser).get()
            .subscribe(doc => {
                this.allUsersEnrolledInfo.push(doc.data());
            });
    }

    async endTrip(tripId, touristId, i) {
        await this.fireStorageService.updateTripStatus('Complete', tripId, touristId).then(
            () => {
                this.buttonTextArray[i] = 'Ended!'
            }
        );
    }

    async approveTrip(tripId, touristId, i) {
        await this.fireStorageService.updateTripStatus('Booked', tripId, touristId).then(
            () => {
                this.buttonTextArray[i] = 'Approved!'
            }
        );
    }

    goback() {
        this.navCtrl.pop();
    }

}
