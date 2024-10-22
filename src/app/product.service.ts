import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _firestore = inject(Firestore);
  private _itemCollection = collection(this._firestore, 'products');
  product$: Observable<Product[]>;

  constructor() {
    this.product$ = collectionData<Product>(this._itemCollection);
  }

  create(product: Product): any {
    return addDoc(this._itemCollection, product);
  }
}
