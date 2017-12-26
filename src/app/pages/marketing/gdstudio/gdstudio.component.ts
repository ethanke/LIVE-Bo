import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';


@Component({
  selector: 'ngx-gdstudio',
  styleUrls: ['./gdstudio.component.scss'],
  templateUrl: './gdstudio.component.html',
})
export class GoogleDataStudioComponent implements OnDestroy {
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
