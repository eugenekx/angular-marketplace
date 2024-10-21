import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  authState,
  idToken,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;

  role: 'admin' | 'default';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

  signup(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  signin(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  signout(): Promise<void> {
    return signOut(this._auth);
  }

  private _setUserData(auth: UserCredential): Promise<User> {
    const user: User = {
      id: auth.user.uid,
      name: (auth.user.displayName || auth.user.email)!,
      email: auth.user.email!,
      emailVerified: auth.user.emailVerified,
      // custom ones
      role: 'default',
    };
    const userDocRef = doc(this._firestore, `users/${user.id}`);
    return setDoc(userDocRef, user).then(() => user);
  }

  async getUserData() {
    const userDocRef = doc(
      this._firestore,
      `users/GKWoALj6YCV4gQu2Gls9mqEqLtr2`
    );

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  authState$ = authState(this._auth);
  user$ = user(this._auth);
  idToken$ = idToken(this._auth);
}
