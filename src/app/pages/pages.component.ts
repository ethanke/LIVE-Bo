import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'

import { HttpHeaders } from '@angular/common/http';
 import { Headers, RequestOptions } from '@angular/http';
 import { Request, RequestMethod} from '@angular/http';
 import { HttpClient } from '@angular/common/http';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private http: HttpClient, private router: Router) {


  }

  ngOnInit() {
      var token = localStorage.getItem("token");
      var email = localStorage.getItem("email");
      if (token === "undefined" || token === null || email === "undefined" || email == null) {
          this.router.navigate(['/auth/login'])
        } else {
          var body = 'mail=' + email + '&token=' + token;
          this.http
            .post('http://92.222.78.82:8080/check_admin',
            body, {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .subscribe((data: any) => {
                if (data.res == true) {
                  localStorage.setItem('token', data.token);
                  var body = 'token=42';
                  var tmp;

                  this.http
                    .post('http://92.222.78.82:8080/get/artist/stats',
                    body, {
                      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                    })
                    .subscribe((data: any) => {
                      localStorage.setItem('date_length', data.data.length);
                        for (var i = 0; i < data.data.length; i++) {
                            localStorage.setItem('date_' + String(i) , data.data[i].date);
                            localStorage.setItem('value_' + String(i) , data.data[i].value);
                          }
                      }, error => {
                      console.log(JSON.stringify(error));
                  });
                } else {
                  localStorage.setItem('email', null);
                  localStorage.setItem('token', null);
                  this.router.navigate(['/auth/login']);
                }
              }, error => {
                localStorage.setItem('email', null);
                localStorage.setItem('token', null);
                this.router.navigate(['/auth/login']);
          });
        }
  }
}
