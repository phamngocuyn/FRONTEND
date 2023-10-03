import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LayoutRoutingModule } from './layout-routing.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    LayoutRoutingModule
  ]
  
})
export class LayoutModule { }
