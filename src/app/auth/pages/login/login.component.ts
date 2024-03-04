import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { HouseService } from 'src/app/protected/services/house/house.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private houseService: HouseService
  ) {}

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: (resp) => {
        if (resp!.status === 200) {
          this.router.navigateByUrl("/home");
          
          if (resp?.data.user.role.includes("worker")) {
            this.houseService.getHouseUser().subscribe(item => {
              localStorage.setItem('houseWorker', item!.house)
            })
          }
          localStorage.setItem('user', JSON.stringify(resp?.data.user))
        }
      },
      error: (err) => {
        console.log(err.error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      },
    });
  }
}
