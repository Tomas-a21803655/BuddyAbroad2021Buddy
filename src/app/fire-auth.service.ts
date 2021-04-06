import { Injectable } from '@angular/core';
import {FireStorageService} from './fire-storage.service';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private firebaseService: FireStorageService, public afAuth: AngularFireAuth) {
  }

  // com

  public doRegister(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  public doLogin(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  public doLogout(): Promise<void> {
    this.firebaseService.unsubscribeOnLogout();
    return this.afAuth.signOut();
  }
}
