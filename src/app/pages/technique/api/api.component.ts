import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';




@Component({
  selector: 'ngx-api',
  styleUrls: ['./api.component.scss'],
  templateUrl: './api.component.html',
})
export class ApiComponent implements OnDestroy {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;



  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = breakpointService.getBreakpointsMap();
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {

  }
}
