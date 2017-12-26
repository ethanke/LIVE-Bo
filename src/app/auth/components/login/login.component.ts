/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { HttpParams } from '@angular/common/http'

import { RouterModule } from '@angular/router'

@Component({
  selector: 'nb-login',
  template: `
    <nb-auth-block>
      <h2 class="title">Se connecter</h2>
      <small class="form-text sub-title">Entrez votre email / mot de passe</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>

        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+"
                 class="form-control" placeholder="Email address" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')" #Email>
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
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
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
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

        <div class="form-group accept-group col-sm-12">

        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Sign In
        </button>
      </form>

    </nb-auth-block>
  `,
})
export class NbLoginComponent {

    @ViewChild('Email') Email: ElementRef;
    @ViewChild('Password') Password: ElementRef;



  public form:FormGroup;

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  email: string;
  password: string;

  fb: any;

  constructor(private http: HttpClient,
              private elRef:ElementRef,
              private router: Router,
              Fb:FormBuilder) {
                  this.fb = Fb;

  }

  ngOnInit() {

            let password = this.Password.nativeElement.value;
            let email = this.Email.nativeElement.value;

            let body = 'token=42';
            this.http.post('http://92.222.78.82:8080/get/artist/stats',body, {
               headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }).subscribe((data: any) => {
                  localStorage.setItem('date_length', data.data.length);
                  for (var i = 0; i < data.data.length; i++) {
                      localStorage.setItem('date_' + String(i) , data.data[i].date);
                      localStorage.setItem('value_' + String(i) , data.data[i].value);
                   }
            }, error => {
              console.log(JSON.stringify(error));
          });

           this.form = this.fb.group({
           'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
           'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
           });;
           this.email = email;
           this.password = password;

           if (localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === null || localStorage.getItem("email") === "undefined" || localStorage.getItem("email") === null) {
           console.log(localStorage.getItem('token'));
           } else {
           console.log("not null");
           console.log(localStorage["token"]);

           body = "token=" + localStorage.getItem("token") + "&email" +localStorage.getItem("email");


           this.http
            .post('http://92.222.78.82:8080/check_admin',
            body, {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            })
            .subscribe((data: any) => {
              if (data.res == true) {
                localStorage.setItem('token', data.token);
                this.router.navigate(['pages']);
              } else {
                localStorage.setItem('email', null);
                localStorage.setItem('token', null);
              }
              }, error => {
                localStorage.setItem('email', null);
                localStorage.setItem('token', null);
           });
           }
  }

  login(): void {
      let password = this.Password.nativeElement.value;
      let email = this.Email.nativeElement.value;

      var body = 'mail=' + email + '&password=' + password;

    this.http
      .post('http://92.222.78.82:8080/login_admin',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        console.log("SETTING EMAIL...");
        console.log(localStorage.getItem("email"));
        this.router.navigate(['pages']);
        }, error => {
        alert("Mot de passe / e-mail incorrect");
    });

  }

  getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
	}

  getConfigValue(key: string): any {
  }
}
