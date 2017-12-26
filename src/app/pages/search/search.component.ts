import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'ngx-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @ViewChild('searchField')searchField: ElementRef;

  tableInfo : any;
  tableApplet : any;
  tableBuf : any;
  tableBuf2 : any;


  constructor(private http : HttpClient)
  {
    this.tableInfo = [];
    this.tableApplet = [];

    var url = "http://10.16.253.16:8080/modules";
    this.http.get(url).subscribe((data : any) => {
          console.log(data);
          for (let item of data)
          {
            this.tableInfo.push({
              name: item.name,
              description: item.description,
              action: item.actions,
              reactions: item.reactions,
            })
          }
    });

    this.tableBuf = this.tableInfo;
    this.tableBuf2 = this.tableApplet;
    console.log(this.tableApplet);
  }

  search()
  {
    var searchKey = this.searchField.nativeElement.value;

      if (searchKey === "")
      {
        this.tableInfo = this.tableBuf;
        return;
      }
      searchKey =  searchKey.charAt(0).toUpperCase() + searchKey.slice(1);
      this.tableInfo = [];
      for(let item of this.tableBuf) {
          if (item.name.indexOf(searchKey) !== -1) {
              this.tableInfo.push(item);
          } else if (item.name.indexOf(searchKey) !== -1) {
              this.tableInfo.push(item);
          }
      }
  }
}
