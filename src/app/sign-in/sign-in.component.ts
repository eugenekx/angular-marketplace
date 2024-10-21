import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private _service = inject(AuthService);
  private _fb = inject(FormBuilder);

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hidePassword = signal(true);

  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private router: Router) {
    merge(
      this.signInForm.controls.email.statusChanges,
      this.signInForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(
      this.signInForm.controls.password.statusChanges,
      this.signInForm.controls.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  hidePasswordClick(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  onSubmit() {
    const { email, password } = this.signInForm.value;

    this._service
      .signin(email!, password!)
      .then((userCredential) => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }

  updateEmailErrorMessage() {
    if (this.signInForm.controls.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.signInForm.controls.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.signInForm.controls.password.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else if (this.signInForm.controls.password.hasError('minlength')) {
      this.passwordErrorMessage.set('Password should have at least 6 symbols');
    } else {
      this.passwordErrorMessage.set('');
    }
  }
}
