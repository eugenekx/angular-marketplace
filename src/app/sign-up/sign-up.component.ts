import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private _service = inject(AuthService);
  private _fb = inject(FormBuilder);

  signUpForm = this._fb.group({ email: [''], password: [''] });

  onSubmit() {
    const { email, password } = this.signUpForm.value;

    this._service
      .signup(email!, password!)
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
