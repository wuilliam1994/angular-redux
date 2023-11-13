import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}

  register(){
    const {username, email, password} = this.myForm.value;
    this.authService.register(username, email, password).subscribe({
      next: (resp) => {
        if (resp!.status === 200) {
          const token = document.cookie.trim().split('=')[1];
          console.log(token);
          this.router.navigateByUrl("/home");
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
