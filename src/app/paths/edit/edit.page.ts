import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";

import { PathsService } from "../../_services/paths.service";
import { MilestonesService } from "../../_services/milestones.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {JWTApiService} from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ PathsService, MilestonesService, SkillsMatrixModelService, SkillsMatrixAPIService, JWTApiService, HttpClient]
})
export class EditPage implements OnInit {
  dirty: boolean = false;
  isNew: boolean = true;

  pathId: number = -1;
  path: any = undefined;
  milestones: any = undefined;

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _pathService: PathsService,
              private _milestoneService: MilestonesService) {

  }

  ngOnInit() {
    let self = this;

    self._route.params.subscribe((params: any) => {
      self.pathId = params['pathId'];

      self.path = {id: -1, name: ''};

      if (self.pathId) { // this is an existing question.. it already has an id.
        self._pathService.getPathById(self.pathId).then((cg: any) => {
          self.path = cg;
          self.isNew = false;

          self._milestoneService.getAllMilestones().then((allMilestones: any) => {
            self.milestones = allMilestones.map(
              (m: any) => {
                m['isSelected'] = self.path['milestones']
                  .map((m1: any) => m1['id'])
                  .includes(m['id'])
                return m;
              }
            );
          });
        });
      }
    });
  }

  isDirty() {
    return this.dirty;
  }

  setDirty() {
    this.dirty = true;
  }

  getPathName() {
    return this.path && this.path["name"];
  }

  getMilestones() {
    return this.milestones
  }

  onNameChange(evt: any) {
    this.path["name"] = evt.currentTarget.value;
    this.setDirty();
  }

  isSaveBtnEnabled() {
    return this.isDirty() && this.milestones.find((path: any) => path['isSelected']);
  }

  onMilestoneSelectionChanged(evt: any) {
    this.setDirty();
  }

  onSaveBtnClick() {
    this._pathService.save(this.path, this.milestones.filter((m: any) => m['isSelected']).map((m: any) => m['id']).join()).then((path: any) => {
      this.path = path;
      this.dirty = false;
    })
  }

  onCancelBtnClick() {
    this._router.navigate(['/paths/display/' + this.pathId])
  }
}
