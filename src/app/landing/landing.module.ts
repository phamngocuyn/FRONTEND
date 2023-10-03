import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { AccumulateComponent } from './components/accumulate/accumulate.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';
import { ImageProductComponent } from './components/home/components/image-product/image-product.component';
import { ModelCartComponent } from './components/home/components/model-cart/model-cart.component';
import { ModelProductComponent } from './components/home/components/model-product/model-product.component';
import { ModelSearchComponent } from './components/home/components/model-search/model-search.component';
import { CoreModule } from '../core/core.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { NewProductComponent } from './components/home/components/new-product/new-product.component';
import { SelledProductComponent } from './components/home/components/selled-product/selled-product.component'; // <-- import the module

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    NewsComponent,
    ContactComponent,
    AccumulateComponent,
    ImageProductComponent,
    ModelCartComponent,
    ModelProductComponent,
    ModelSearchComponent,
    NewProductComponent,
    SelledProductComponent,
  ],
  imports: [
    LandingRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    NgxPaginationModule
  ]
})
export class LandingModule { }
