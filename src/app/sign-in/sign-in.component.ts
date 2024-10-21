import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private _service = inject(AuthService);
  private _fb = inject(FormBuilder);

  signInForm = this._fb.group({ email: [''], password: [''] });

  onSubmit() {
    const { email, password } = this.signInForm.value;

    this._service
      .signin(email!, password!)
      .then((userCredential) => {
        // Handle successful sign up
        console.log(userCredential);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }
}
