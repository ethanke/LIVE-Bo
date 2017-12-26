import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { DatePickerComponent } from 'ng2-date-picker';
import { DatepickerOptions } from 'ng2-datepicker';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-createevent',
  styleUrls: ['./createevent.component.scss'],
  templateUrl: './createevent.component.html',
})
export class CreateEventComponent implements OnDestroy {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  Artistes: any;
  ArtistesGroupName: Array<string>;
  SelectArtist: string;
  SelectedArtist: any;
  address: string;
  userSettings: any;

   date: Date;

   @ViewChild('hour') hour: ElementRef;



  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              public http: HttpClient) {
    this.date = new Date();
    this.Artistes = [];
    this.ArtistesGroupName = [];
    this.breakpoints = breakpointService.getBreakpointsMap();
    this.userSettings = {
      inputPlaceholderText: 'Area name',
      geoLocDetailServerUrl: true,
    }

    this.userSettings = Object.assign({},this.userSettings)
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

        var body = 'token=42';

        this.http
          .post('http://92.222.78.82:8080/get/artist',
          body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .subscribe((data: any) => {
              for (var i = 0; i < data.artist.length; i++) {
                  this.Artistes.push(data.artist[i]);
              }
              for (let item of this.Artistes) {
                this.ArtistesGroupName.push(item.name);
              }
            }, error => {
            console.log(JSON.stringify(error));
        });
    }

    autoCompleteCallback1(selectedData:any) {
          console.log(selectedData.data.place_id);
          this.address = selectedData.data.place_id;
      }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {

  }

  doChange() {
      for (let item of this.Artistes) {
          if (this.SelectArtist == item.name) {
              this.SelectedArtist = item;
          }
      }
  }

  getAddress(event) {
      this.address = event;
  }


  changeDate() {

  }

  openDatePicker() {

  }

  createEvent() {
      var hour = this.hour.nativeElement.value;
      var minute = hour.split(':')[1]
      hour = hour.split(':')[0]
      var newDate = new Date(this.date);
      newDate.setMinutes(minute);
      newDate.setHours(hour);

      console.log(this.address);
      if (this.SelectedArtist) {
          if (this.date) {
              if (hour != "") {
                  if (this.address) {
                      var stringDate = "";
                      stringDate = newDate.toISOString()
                      console.log(stringDate);
                      var body = 'token=42&place_id=' + this.address + "&time=" + newDate.toISOString() + "&date=" + stringDate + "&artist_id=" + this.SelectedArtist._id;
                      console.log(body);

                      this.http
                        .post('http://92.222.78.82:8080/create/event',
                        body, {
                          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                        })
                        .subscribe((data: any) => {
                            console.log(data);
                            var bodyp = 'token=42' + '&artist_id=' + this.SelectedArtist._id + '&count=' + String(this.SelectedArtist.nb_live - 1);


                                this.http
                                  .post('http://92.222.78.82:8080/add/artist/live',
                                  bodyp, {
                                    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
                                  })
                                  .subscribe(data => {
                                      console.log(data);
                                      location.reload();
                                    }, error => {
                                    console.log(JSON.stringify(error));
                                });
                        }, error => {
                            console.log(JSON.stringify(error));
                        });

                  } else {
                      alert("Vous devez choisir un lieu.");
                  }
              } else {
                  alert("Vous devez choisir une heure.");
              }
          } else {
              alert("Vous devez choisir une date.");
          }
      } else {
          alert("Vous devez choisir un groupe.");
      }
  }

}
