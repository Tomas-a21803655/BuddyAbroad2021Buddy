import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FireStorageService} from '../fire-storage.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    public validationsForm: FormGroup;

    constructor(public fireStorageService: FireStorageService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                public router: Router,
    ) {
    }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required
            ])),
            time: new FormControl('', Validators.compose([
                Validators.required
            ])),
            size: new FormControl('', Validators.compose([
                Validators.required
            ])),
            price: new FormControl('', Validators.compose([
                Validators.required
            ])),
            details: new FormControl('', Validators.compose([
                Validators.required
            ])),
        });
    }

    resetFields(){
        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            size: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            details: new FormControl('', Validators.required),
        });
    }

    goback() {
        this.navCtrl.pop();
    }

    async onSubmit(value) {
        const trip: HomeTripCardsModel = {
            image: 'assets/logoandname.png',
            rating: 0,
            name: value.name,
            description: value.description,
            time: value.time,
            size: value.size,
            price: value.price,
            details: value.details,
        };
        await this.fireStorageService.createTrip(trip).then(
            () => {
                this.resetFields();
                this.router.navigate(['/tabs/bookings']);
            }
        );
    }

}
