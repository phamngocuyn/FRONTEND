import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;

      // TODO: Gửi email xác nhận hoặc liên kết đặt lại mật khẩu

      Swal.fire({
        title: 'Yêu cầu đặt lại mật khẩu đã gửi',
        text: 'Vui lòng kiểm tra email của bạn để tiếp tục.',
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Email không hợp lệ',
        icon: 'error',
      });
    }
  }
}
