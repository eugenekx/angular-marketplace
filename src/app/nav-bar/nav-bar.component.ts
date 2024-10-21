import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, UserRole } from '../auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private _authService = inject(AuthService);
  userData: User | null = null;
  userRole: UserRole = null;

  ngOnInit() {
    this._authService.currentUserRole$.subscribe((role: UserRole) =>
      console.log(role)
    );

    this._authService.user$.subscribe((user: User) => console.log(user));
  }
}
