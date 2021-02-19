import {Injectable} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {HomeTripCardsModel} from './shared/homeTripCards.model';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

    private static USERS_KEY = 'users';
    private static TRIPS_KEY = 'createdTrips';

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(public af: AngularFirestore, public angularAuth: AngularFireAuth) {
    }

    public unsubscribeOnLogout(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public async assignNewAccBalance(): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).set({earnings: 0});
    }

    public async createTrip(homeTripCard: HomeTripCardsModel): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        homeTripCard.id = this.af.createId();
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid)
            .collection(FireStorageService.TRIPS_KEY).doc(homeTripCard.id).set(homeTripCard);
    }

    public getUserTrips(): Observable<Array<HomeTripCardsModel>> {
        return this.angularAuth.user
            .pipe(takeUntil(this.unsubscribe),
                switchMap(user => {
                    return this.af.collection(FireStorageService.USERS_KEY).doc(user.uid)
                        .collection<HomeTripCardsModel>(FireStorageService.TRIPS_KEY).valueChanges();
                }));
    }

    public async deleteTrip(tripId: any): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid)
            .collection(FireStorageService.TRIPS_KEY).doc(tripId).delete();
    }

    getTripDetail(tripId: string): Observable<HomeTripCardsModel> {
        return this.angularAuth.user
            .pipe(takeUntil(this.unsubscribe),
                switchMap(user => {
                    return this.af.collection(FireStorageService.USERS_KEY).doc(user.uid)
                        .collection<HomeTripCardsModel>(FireStorageService.TRIPS_KEY).doc<HomeTripCardsModel>(tripId).valueChanges();
                }));
    }

    public getUserEarnings(): Observable<any> {
        const currentUser = firebase.auth().currentUser;
        return this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).valueChanges();
    }

}
