import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  selector: 'app-admin',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  product$: Observable<Product[]>;
  firestore: Firestore = inject(Firestore);
  rowData: Product[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'description' },
    { field: 'price' },
    { field: 'stock' },
    { field: 'category' },
    { field: 'date' },
    { field: 'status' },
    { field: 'image' },
    { field: 'rating' },
  ];

  constructor() {
    const itemCollection = collection(this.firestore, 'products');
    this.product$ = collectionData<Product>(itemCollection);
  }

  ngOnInit() {
    this.product$.subscribe((data) => {
      this.rowData = data; // Обновляем данные в гриде
      console.log(data);
    });
  }
}
