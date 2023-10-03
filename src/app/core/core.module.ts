import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { TypeService } from './services/type.service';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CategoryService,
    TypeService,
    ProductService,
    AuthService
  ]
})
export class CoreModule { }
