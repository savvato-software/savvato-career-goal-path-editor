import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {FunctionPromiseService, JWTApiService} from "@savvato-software/savvato-javascript-services";
import {environment} from "../../../_environments/environment";
import {SavvatoCareerpathComponentModule} from "@savvato-software/savvato-careerpath-component";
import {PathsService} from "../../_services/paths.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SavvatoCareerpathComponentModule],
  providers: [ PathsService, JWTApiService, HttpClient ]
})
export class DisplayPage implements OnInit {

  path: any = undefined;
  pathId: number = -1;

  funcKey = "pathsDisplayCtrlr";

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _pathsService: PathsService,
              private _functionPromiseService: FunctionPromiseService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe((params: any) => {
      self.pathId = params['pathId'];

      self._pathsService.getPathById(self.pathId).then((path: any) => {
        self.path = path;
      })

      self._functionPromiseService.initFunc(self.funcKey, () => {
        return new Promise((resolve, reject) => {
          resolve({
            getEnv: () => {
              return environment;
            },
            pathProviderFunction: () => {
              return self.path;
            },
            onMilestoneNameClick: (o: any) => {
              this._router.navigate(['/milestones/display/' + o['id']]);
            },
            onLabourNameClick: (o: any) => {
              this._router.navigate(['/labours/display/' + o['id']]);
            }
          })
        })
      })
    })
  }

  getCareerGoalPathComponentController() {
    return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  getPath() {
    return [this.path];
  }

  getPathName() {
    return this.path && this.path['name']
  }

  getPathMilestones() {
    return this.path && this.path['milestones'];
  }

  onEditPathBtnClick() {
    this._router.navigate(['/paths/edit/' + this.pathId]);
  }

  onBackBtnClick() {
    this._location.back();
  }
}
