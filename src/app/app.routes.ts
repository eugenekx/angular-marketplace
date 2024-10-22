import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'storefront', component: StorefrontComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '', redirectTo: 'storefront', pathMatch: 'full' },
];
