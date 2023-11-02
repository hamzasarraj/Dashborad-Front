import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {DashboardService} from "../../core/services/dashboard.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  kibanaDashboard = '';

  constructor(private kibanaProvider: DashboardService) {
  }

  ngOnInit(): void {

    this.kibanaDashboard = 'http://localhost:5601/app/dashboards#/view/51d03a10-6d31-11ee-b0e1-f75d33f45fa7?_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))';
   /* this.kibanaProvider.getDashboard().subscribe(r =>{
      console.log(r)
      this.kibanaDashboard = environment.kibanaUrl +  r})*/
  }

  iframeLoaded(e: Event): void {
    const ifr: HTMLIFrameElement = e.target as HTMLIFrameElement;

    if (ifr.contentDocument) {

      const mutationObserver = new MutationObserver(() => {
        if (ifr.contentDocument?.getElementById('dashboardListingHeading')) {
          return;
        }

        // Wait for the Kibana wrapper to fully load
        const kbnWrapperList = ifr.contentDocument?.getElementsByClassName('kbnAppWrapper');
        if (kbnWrapperList && kbnWrapperList.length > 0) {

          // Set correct Kibana iframe height
          ifr.height = kbnWrapperList[0].scrollHeight + 'px';
        }
      });

      const config = {
        subtree: true,
        childList: true,
        characterData: true
      };

      mutationObserver.observe(ifr.contentDocument.body, config);
      setTimeout(() => mutationObserver.disconnect(), 10000);
    }
  }
}

