import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  loginUser() {
    const val = this.form.value;
    this.auth.loginUser(val).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.id)
        this.auth.setUserId(res.id)
        this.router.navigate(['/posts']);
      },
      (err) => console.log('Login error', err)
    );
  }
}
