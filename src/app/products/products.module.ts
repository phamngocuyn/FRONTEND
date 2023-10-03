import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


//primeNG
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';
import { ImageModule } from 'primeng/image';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    ProductsRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    NgxPaginationModule,
    InputSwitchModule,
    SliderModule,
    FormsModule,
    ImageModule
    
  ]
})
export class ProductsModule { }
