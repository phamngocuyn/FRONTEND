import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
