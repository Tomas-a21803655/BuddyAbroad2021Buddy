import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.page.html',
  styleUrls: ['./visit-details.page.scss'],
})
export class VisitDetailsPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }

  public openBuyVisitPage(): void {
    this.router.navigate(['/buy-visit']);
  }

}
