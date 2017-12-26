import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

    chartone: number = 0;
    charttwo: number = 0;

    constructor(public http: HttpClient, public router: Router) {
        var body = "token=42";
        this.http
          .post('http://92.222.78.82:8080/get/artist',
          body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          })
          .subscribe((data: any) => {
            // data.artist.length;
            this.chartone = data.artist.length;
            }, error => {
            console.log(JSON.stringify(error.json()));
        });
        var body = 'token=42';
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('http://92.222.78.82:8080/get/event',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .subscribe((data: any) => {
        this.charttwo = data.events.length;
        }, error => {
        console.log(JSON.stringify(error.json()));
    });
    }
}
