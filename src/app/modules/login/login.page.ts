import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from '../../shared/models/user-credentials';
import { catchError, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth-response';
import { AuthService } from '../../core/services/auth/auth.service';

type LoginError = 'EMAIL_NOT_FOUND' | 'INVALID_PASSWORD';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [ './login.page.scss' ],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  userCredentials: UserCredentials;
  loading$ = new BehaviorSubject(false);

  private unsubscribe$ = new Subject();

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userCredentials = {
      email: null,
      password: null,
      returnSecureToken: true
    };
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [ null, [ Validators.required ], ],
      password: [ null, [ Validators.required ] ]
    });

    this.email.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(email => {
        this.userCredentials.email = email ? email : null;
      });

    this.password.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(password => {
        this.userCredentials.password = password ? password : null;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    if (this.loginForm.valid) {
      this.loading$.next(true);
      this.authService.login(this.userCredentials)
        .pipe(
          catchError(error => {
            const invalidPassword: LoginError = 'INVALID_PASSWORD';
            const emailNotFound: LoginError = 'EMAIL_NOT_FOUND';
            const errorMessage = error.error.error.message;

            this.loading$.next(false);

            if (errorMessage === invalidPassword) {
              this.password.setErrors({ invalidPassword: true });
            }

            if (errorMessage === emailNotFound) {
              this.email.setErrors({ emailNotFound: true });
            }

            return of([]);
          }),
          takeUntil(this.unsubscribe$))
        .subscribe(async (response: AuthResponse) => {
          this.loading$.next(false);
          if (response.idToken) {
            await this.router.navigate([ '/app' ]);
          }
        });
    }
  }
}
