import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public validationsForm: FormGroup;

  public userName;
  public userDescription;
  public userHome;
  public userLanguages;
  public userRating;
  public userImage;



  constructor(
      private formBuilder: FormBuilder,
      public fireStorageService: FireStorageService,
      public router: Router,
  ) { }

  ngOnInit() {
    this.fireStorageService.getUserDocInfo().subscribe((data) => {
      this.userName = data.name;
      this.userDescription = data.description;
      this.userHome = data.home;
      this.userLanguages = data.languages;
      this.userRating = data.rating;
      this.userImage = data.image;
    });

    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      home: new FormControl('', Validators.compose([
        Validators.required
      ])),
      languages: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async onSubmit(value) {

    const profile = {
      image: 'assets/mockprofile.jpg',
      rating: 0,
      home: value.home,
      name: value.name,
      description: value.description,
      languages: value.languages,
    };
    await this.fireStorageService.createProfile(profile).then(
        () => {
          this.resetFields();
          this.router.navigate(['/tabs/profile']);
        }
    );

  }

  resetFields(){
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      home: new FormControl('', Validators.required),
      languages: new FormControl('', Validators.required),
    });
  }

}
