import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor = 'primary';

  constructor( private renderer: Renderer2) {}
  changeSidebarColor(color){
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    const body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    sidebar.setAttribute('data',this.sidebarColor);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('white-content');

    const sidebar2 = document.getElementsByClassName('sidebar')[0] as HTMLElement;
    this.renderer.setStyle(sidebar, 'margin-top', '55px');
    this.renderer.setStyle(sidebar, 'margin-left', '11px');
    this.renderer.setStyle(sidebar, 'width', '180px');

  }
}
