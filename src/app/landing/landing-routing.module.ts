import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { AccumulateComponent } from './components/accumulate/accumulate.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ProductDetailComponent } from '../products/components/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'news', component: NewsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'accumulate', component: AccumulateComponent },
      { path: 'BAN_PHIM', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule) 
      },
      { path: 'CHUOT', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule) 
      },
      { path: 'LOT_CHUOT', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule) 
      },
      { path: 'FEET_CHUOT', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule) 
      },
      { path: 'SWITCH_LUBE', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule)
      },
      { path: ':type', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule) 
      }
      ,
      { path: 'new_product', 
        loadChildren: () => 
        import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'product-detail/:route', component: ProductDetailComponent
      }

    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
