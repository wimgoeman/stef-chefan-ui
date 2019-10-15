import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

class Credentials {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: firebase.User = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this._user = user
    })
  }

  get user() {
    return this._user
  }

  doRegister(credentials: Credentials) {
    return new Observable<firebase.auth.UserCredential>((observer) => {
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(res => {
          observer.next(res)
        })
    })
  }

  doLogout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigateByUrl("/login")
      })
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return new Observable<boolean>((observer) => {
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          observer.complete()
          this.router.navigateByUrl("/")
        }).catch(err => {
          observer.next(true)
          observer.complete()
        })
    })
  }

  doLogin(email: string, password: string) {
    return new Observable<boolean>((observer) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          observer.complete()
          this.router.navigateByUrl("/")
        }).catch(err => {
          observer.next(true)
          observer.complete()
        })
    })
  }
}
