import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public homeTripCards;

    constructor(private router: Router, public db: AngularFirestore) {
    }

    ngOnInit() {
        this.getAllhomeTripCards().subscribe((data) => {
            this.homeTripCards = data;
        });
    }

    getAllhomeTripCards(): Observable<any> {
        return this.db.collection<any>('homeTripCards').valueChanges();
    }

    public openVisitDetailsPage(): void {
        console.log()
        this.router.navigate(['/visit-details']);
    }

}
