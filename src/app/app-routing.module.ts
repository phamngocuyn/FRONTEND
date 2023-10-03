import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { PaymentComponent } from './checkout/payment/payment.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'checkout/payment', component: PaymentComponent, data: { hideLayout: true } },
  { path: '**', redirectTo: '' }
  // { path: 'product-detail/:route', component: ProductDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
