import { CheckoutRoutingModule } from './checkout-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
  ]
})
export class CheckoutModule { }
