import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../auth.service';

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

  ngOnInit() {
    // this._authService.user$.subscribe((userData: User) => {
    //   console.log(userData);
    //   this.userData = userData;
    // });

    this._authService.getUserData();
  }
}
