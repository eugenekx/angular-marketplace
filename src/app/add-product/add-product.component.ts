import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  private _fb = inject(FormBuilder);
  private _ps = inject(ProductService);
  private _authService = inject(AuthService);
  currentUserId = '';

  constructor() {
    this._authService.user$.subscribe(
      (user: User) => (this.currentUserId = user.uid)
    );
  }

  addProductForm = this._fb.group({
    name: [''],
    description: [''],
    price: [''],
    category: [''],
    image: [''],
  });

  onSubmit() {
    const product = new Product();
    const formValue = this.addProductForm.value;

    const newProduct = {
      ...product,
      name: formValue.name || '',
      description: formValue.description || '',
      price: parseInt(formValue.price || '0', 10),
      category: formValue.category || '',
      image: formValue.image || '',
      sellerId: this.currentUserId,
    };

    console.log(newProduct);

    this._ps.create(newProduct).then(() => {
      console.log('Created new item successfully!');
    });
  }
}
