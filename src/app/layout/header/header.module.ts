import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule, 
    FormsModule,
    CoreModule
  ],
  

})
export class HeaderModule { }
