import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

export const firebaseConfig = {
    apiKey: 'AIzaSyA2dv29iU-p4iSRjCRSdwYWnBpqLZpZ41o',
    authDomain: 'buddy-abroad-4e98c.firebaseapp.com',
    databaseURL: 'https://buddy-abroad-4e98c.firebaseio.com',
    projectId: 'buddy-abroad-4e98c',
    storageBucket: 'buddy-abroad-4e98c.appspot.com',
    messagingSenderId: '857863312606',
    appId: '1:857863312606:web:6d960cd56f8ee95d821e4f',
    measurementId: 'G-2P056E62K3'
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
