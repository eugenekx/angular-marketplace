import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

import { inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private _ps = inject(ProductService);

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

  ngOnInit() {
    this._ps.product$.subscribe((data) => {
      this.rowData = data; // Обновляем данные в гриде
      console.log(data);
    });
  }
}
