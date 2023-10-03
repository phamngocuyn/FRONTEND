import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { CheckoutModule } from './checkout/checkout.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    CoreModule,
    LayoutRoutingModule,
    // CheckoutModule
  ],
  exports: [
    HeaderComponent, // Đảm bảo đã export HeaderComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
