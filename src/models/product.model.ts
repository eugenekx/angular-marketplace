export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  stock: number = 0;
  category: string = '';
  date: string = '';
  status: 'available' | 'out of stock' | 'pending' = 'out of stock';
  image: string = '';
  rating: number = 0;
}
