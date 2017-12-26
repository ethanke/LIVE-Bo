import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

@Component({
  selector: 'ngx-ganalytics',
  styleUrls: ['./ganalytics.component.scss'],
  templateUrl: './ganalytics.component.html',
})
export class GoogleAnalyticsComponent implements OnDestroy {
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
}
