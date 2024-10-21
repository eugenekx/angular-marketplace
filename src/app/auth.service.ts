import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  authState,
  user,
  User,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export type UserRole = 'admin' | 'default' | null;

export interface UserProfile {
  id: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

  signup(email: string, password: string): Promise<UserProfile> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  signin(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    );
  }

  signout(): Promise<void> {
    return signOut(this._auth);
  }

  private _setUserData(auth: UserCredential): Promise<UserProfile> {
    const user: UserProfile = {
      id: auth.user.uid,
      role: 'default',
    };
    const userDocRef = doc(this._firestore, `users/${user.id}`);
    return setDoc(userDocRef, user).then(() => user);
  }

  async getUserRole(uid: string): Promise<UserRole> {
    const userDocRef = doc(this._firestore, `users/${uid}`);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data()['role'];
    } else {
      return null;
    }
  }

  authState$ = authState(this._auth);
  user$ = user(this._auth);
  currentUserRole$ = this.user$.pipe(
    switchMap((user: User | null) =>
      user ? this.getUserRole(user.uid) : of(null)
    )
  );
}
