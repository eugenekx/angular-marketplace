import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _firestore = inject(Firestore);

  create(product: Product): any {
    const itemCollection = collection(this._firestore, 'products');
    return addDoc(itemCollection, product);
  }
}
