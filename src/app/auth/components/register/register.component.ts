/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
 import { Router } from '@angular/router';
 import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
 import { getDeepFromObject } from '../../helpers';


 import { HttpHeaders } from '@angular/common/http';
 import { Headers, RequestOptions } from '@angular/http';
 import { Request, RequestMethod} from '@angular/http';
 import { HttpClient } from '@angular/common/http'

 import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <nb-auth-block>
      <h2 class="title">Sign Up</h2>
      <form (ngSubmit)="register()" #form="ngForm">


      <div class="form-group">
        <label for="input-username" class="sr-only">Username</label>
        <input name="username" [(ngModel)]="user.username" id="input-username" #username="ngModel"
               class="form-control" placeholder="Username"
               #Username>
      </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Email address" pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')" #Email>
          <small class="form-text error" *ngIf="email.invalid && email.touched ">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')" #Password>
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required" >
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            Password should contains
            from {{ getConfigValue('forms.validation.password.minLength') }}
            to {{ getConfigValue('forms.validation.password.maxLength') }}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">Repeat password</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control" placeholder="Confirm Password" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')" #RePassword>
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            Password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>

        <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">
          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">
            Agree to <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>
          </nb-checkbox>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Register
        </button>
      </form>

      <div class="links">
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign in</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class NbRegisterComponent {

  @ViewChild('Email') Email: ElementRef;
  @ViewChild('Username') Username: ElementRef;
  @ViewChild('Password') Password: ElementRef;
  @ViewChild('RePassword') RePassword: ElementRef;

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(private http: HttpClient,
              private elRef:ElementRef,
              private router: Router) {
    this.errors = []
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.provider = this.getConfigValue('forms.register.provider');
  }

  register(): void {
    let email = this.Email.nativeElement.value;
    let password = this.Password.nativeElement.value;
    let rePassword = this.RePassword.nativeElement.value;
    let username = this.Username.nativeElement.value;

    if (username) {
        if (password == rePassword) {
            var url = "http://10.16.253.16:8080/oauth/register";
            var headers = new HttpHeaders();
            var body =  JSON.stringify({username: username, email: email, password: password});

            headers.append('Content-Type', 'raw');
            this.http
              .post(url,
              body, {
                headers: headers
              })
              .subscribe((data : any) => {
                  console.log(data);
                  localStorage.setItem('token', JSON.stringify(data.token));
                  localStorage.setItem('email', JSON.stringify(this.Email.nativeElement.value));
                  this.router.navigate(['/pages']);
            });
        } else {
            alert("Password and Confirm password doesn't match")
        }
    } else {
        alert("Username missing")
    }
    // this.errors = this.messages = [];
    // this.submitted = true;
    //
    // this.service.register(this.provider, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;
    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }
    //
    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    // });
  }

  getConfigValue(key: string): any {

  }
}
