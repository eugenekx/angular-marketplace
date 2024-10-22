import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

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

  product: Product = new Product();

  addProductForm = this._fb.group({
    name: [''],
    description: [''],
    price: [''],
    category: [''],
    image: [''],
  });

  onSubmit() {
    const formValue = this.addProductForm.value;
    const newProduct = { formValue, ...this.product };

    this._ps.create(newProduct).then(() => {
      console.log('Created new item successfully!');
    });
  }
}
