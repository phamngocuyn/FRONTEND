import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
// import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  
  
  constructor(
    private formbuilder : FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }
  
  ngOnInit(): void {
  }
  getInputBorderColor(controlName: string): string {
    const control = this.loginForm.get(controlName);
  
    if (control) {
      if (control.invalid && (control.dirty || control.touched)) {
        return 'red'; // Trường không hợp lệ và đã được thay đổi hoặc chạm vào
      } else if (control.valid && (control.dirty || control.touched)) {
        return 'green'; // Trường hợp lệ và đã được thay đổi
      }
    }
  
    return 'black'; // Trường chưa được chạm vào
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.getLogin().subscribe((users: any)=> {
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) 
        {
          Swal.fire({
            title: 'Đăng nhập thành công',
            icon: 'success',
          });
          this.router.navigate(['/']);
        } else 
        {
          Swal.fire({
            title: 'Đăng nhập thất bại',
            icon: 'error',
          });
        }
      });
    } else {
      console.log('Form không hợp lệ');
    }
  }
}
