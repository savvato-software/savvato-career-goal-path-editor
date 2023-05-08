import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";

import { PathsService } from "../_services/paths.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-paths',
  templateUrl: './paths.page.html',
  styleUrls: ['./paths.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ PathsService, JWTApiService, HttpClient ]
})
export class PathsPage implements OnInit {

  paths: any = undefined;

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _pathService: PathsService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe((params: any) => {
      self._pathService.getAllPaths().then((paths: any) => {
        self.paths = paths.sort((a: any,b: any) => { return a['name'].localeCompare(b['name']); });
      })
    })
  }

  getAllPaths() {
    return this.paths;
  }

  onPathClick(p: any) {
    this._router.navigate(['/paths/display/' + p['id']]);
  }

  onNewPathBtnClick() {
    // todo: implement
  }
}
