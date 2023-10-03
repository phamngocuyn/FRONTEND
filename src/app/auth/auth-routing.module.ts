import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
