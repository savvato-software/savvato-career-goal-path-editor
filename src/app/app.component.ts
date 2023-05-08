import { CommonModule } from '@angular/common';
import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule ]
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Career Goals',
      url: '/career-goals',
      icon: 'mail'
    },
    {
      title: 'Paths',
      url: '/paths',
      icon: 'mail'
    },
    {
      title: 'Milestones',
      url: '/milestones',
      icon: 'mail'
    },
    {
      title: 'Labours',
      url: '/labours',
      icon: 'mail'
    }
  ];

  constructor(public environmentInjector: EnvironmentInjector) {

  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
