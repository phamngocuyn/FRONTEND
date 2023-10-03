import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout.component';
import { PaymentComponent } from './payment/payment.component';



const routes: Routes = [
      {
        path: '',
        component: CheckoutComponent,
        children: [
            {
              path: 'cart',
              component: CartComponent
            },
            // {
            //   path: 'payment',
            //   component: PaymentComponent
            // },
        ],
      },
      // { path: 'checkout/payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
