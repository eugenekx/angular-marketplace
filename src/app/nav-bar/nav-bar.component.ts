import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, UserRole } from '../auth.service';
import { User } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private _authService = inject(AuthService);
  userData: User | null = null;
  userRole: UserRole = null;

  ngOnInit() {
    this._authService.currentUserRole$.subscribe(
      (role: UserRole) => (this.userRole = role)
    );

    this._authService.user$.subscribe((user: User) => (this.userData = user));
  }

  signout() {
    this._authService.signout();
  }
}
