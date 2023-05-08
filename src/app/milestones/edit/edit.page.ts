import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";

import { LaboursService } from "../../_services/labours.service";
import { MilestonesService } from "../../_services/milestones.service";
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {JWTApiService} from "@savvato-software/savvato-javascript-services";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ LaboursService, MilestonesService, SkillsMatrixModelService, SkillsMatrixAPIService, JWTApiService, HttpClient ]
})
export class EditPage implements OnInit {
  dirty: boolean = false;
  isNew: boolean = true;

  milestoneId: number = -1;
  milestone: any = undefined;
  labours: any = undefined;

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _laboursService: LaboursService,
              private _milestoneService: MilestonesService) {

  }

  ngOnInit() {
    let self = this;

    self._route.params.subscribe((params: any) => {
      self.milestoneId = params['milestoneId'];

      self.milestone = {id: -1, name: ''};

      if (self.milestoneId) { // this is an existing question.. it already has an id.
        self._milestoneService.getMilestoneById(self.milestoneId).then((cg: any) => {
          self.milestone = cg;
          self.isNew = false;

          self._laboursService.getAllLabours().then((allLabours: any) => {
            self.labours = allLabours.map(
              (l: any) => {
                l['isSelected'] = self.milestone['labours']
                  .map((l1: any) => l1['id'])
                  .includes(l['id'])
                return l;
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

  getMilestoneName() {
    return this.milestone && this.milestone["name"];
  }

  getLabours() {
    return this.labours || []
  }

  onNameChange(evt: any) {
    this.milestone["name"] = evt.currentTarget.value;
    this.setDirty();
  }

  isSaveBtnEnabled() {
    return this.isDirty() && this.labours.find((labour: any) => labour && labour['isSelected']);
  }

  onLabourSelectionChanged(evt: any) {
    this.setDirty();
  }

  onSaveBtnClick() {
    this._milestoneService.save(this.milestone, this.labours.filter((l: any) => l && l['isSelected']).map((l: any) => l['id']).join()).then((milestone) => {
      this.milestone = milestone;
      this.dirty = false;
    })
  }

  onCancelBtnClick() {
    this._router.navigate(['/milestones/display/' + this.milestoneId])
  }
}
