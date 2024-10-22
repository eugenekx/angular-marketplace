import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [ProductCardComponent, MatPaginatorModule],
  templateUrl: './storefront.component.html',
  styleUrl: './storefront.component.scss',
})
export class StorefrontComponent {
  private _ps = inject(ProductService);
  products: Product[] = [];

  ngOnInit() {
    this._ps.product$.subscribe((data) => {
      this.products = data; // Обновляем данные в гриде
    });
  }
}
