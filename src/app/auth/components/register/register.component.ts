import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
    ) {
    this.registerForm = this.formBuilder.group({
      ho: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
  
      this.authService.checkExistingUser(email).subscribe(exists => {
        if (!exists) {
          this.authService.postRegister(this.registerForm.value).subscribe(res =>{
            Swal.fire({
              title: 'Đăng kí tài khoản thành công',
              icon: 'success',
            });
            
            this.registerForm.reset();
            this.router.navigate(['/auth/login'])
          });
        } else {
          Swal.fire({
            title: 'Tài khoản đã tồn tại',
            icon: 'error',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Đăng kí tài khoản không hợp lệ',
        icon: 'error',
      });
    }
  }
  
}
