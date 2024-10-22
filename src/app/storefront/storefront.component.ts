import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  date: string;
  status: 'available' | 'out of stock' | 'pending';
  image: string;
  rating: number;
}

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [ProductCardComponent, MatPaginatorModule],
  templateUrl: './storefront.component.html',
  styleUrl: './storefront.component.scss',
})
export class StorefrontComponent {
  product$: Observable<Product[]>;
  firestore: Firestore = inject(Firestore);
  products: Product[] = [];

  constructor() {
    const itemCollection = collection(this.firestore, 'products');
    this.product$ = collectionData<Product>(itemCollection);
  }

  ngOnInit() {
    this.product$.subscribe((data) => {
      this.products = data; // Обновляем данные в гриде
    });
  }
}
