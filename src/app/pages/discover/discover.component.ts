import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-discover',
  styleUrls: ['./discover.component.scss'],
  templateUrl: './discover.component.html',
})

export class DiscoverComponent {

    tableInfo : any;
    toggleTab : any;

    constructor(private http: HttpClient) {
      this.tableInfo = [];
      this.toggleTab = new Array();

      var url = "http://10.16.253.16:8080/template/applets";
      this.http.get(url).subscribe((data : any) => {
          for (var i = 0; i < data.length; i++)
            {
              var tmp = [];
              for (var j = 0; j < 3 && i < data.length; j++) {
                tmp.push({
                  name: data[i].name,
                  action: data[i].action,
                  backcolor: data[i].backgroundColor,
                  imageUrl: data[i].imageUrl,
                  reaction: data[i].reaction,
                  description: data[i].description,
                  enumPlace: i
                })
                if (j + 1 < 3) {
                  i++;
                }
              }
              this.tableInfo.push(tmp);
            }
      });
    }

    toggleUpdate(index: number) {
      this.toggleTab[index] = !this.toggleTab[index];
    }

}
