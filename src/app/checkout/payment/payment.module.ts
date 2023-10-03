import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { AppModule } from "../../app.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from '../checkout-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
    declarations: [
        // PaymentComponent
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
export class PaymentModule { }
