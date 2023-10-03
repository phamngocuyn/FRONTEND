import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      // { path: 'product-detail/:route', component: ProductDetailComponent },
      // { path: 'product-detail/:path', component: ProductDetailComponent },
      { 
        path: 'product-detail/:route', 
        component: ProductDetailComponent,
        children: [
          { path: ':path', component: ProductDetailComponent } // Thêm child route
        ]
      },
    ],
  },
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
