import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CareerGoalService } from '../../_services/career-goal.service'
import { PathsService } from '../../_services/paths.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPage implements OnInit {

  dirty: boolean = false;
  careerGoalId: number = -1;
  careerGoal: any = undefined;
  isNew: boolean = true;

  paths: any = undefined;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _pathService: PathsService,
              private _careerGoalService: CareerGoalService) {

  }

  ngOnInit() {
    let self = this;

    self._route.params.subscribe((params: any) => {
      self.careerGoalId = params['careerGoalId'];

      self.careerGoal = {id: -1, name: ''};

      if (self.careerGoalId) { // this is an existing question.. it already has an id.
        self._careerGoalService.getCareerGoalById(self.careerGoalId).then((cg: any) => {
          self.careerGoal = cg;
          self.isNew = false;

          self._pathService.getAllPaths().then((paths: any) => {
            self.paths = paths.map(
              (p: any) => {
                p['isSelected'] = self.careerGoal['paths']
                  .map((cgp: any) => cgp['id'])
                  .includes(p['id'])
                return p;
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

  getCareerGoalName() {
    return this.careerGoal && this.careerGoal["name"];
  }

  getPaths() {
    return this.paths
  }

  onNameChange(evt: any) {
    this.careerGoal["name"] = evt.currentTarget.value;
    this.setDirty();
  }

  isSaveBtnEnabled() {
    return this.isDirty() && this.paths.find((path: any) => path['isSelected']);
  }

  onPathSelectionChanged(evt: any) {
    this.setDirty();
  }

  onSaveBtnClick() {
    this._careerGoalService.save(this.careerGoal, this.paths.filter((p: any) => p['isSelected']).map((p: any) => p['id']).join()).then((careerGoal) => {
      this.careerGoal = careerGoal;
      this.dirty = false;
    })
  }

  onCancelBtnClick() {
    this._router.navigate(['/career-goals/display/' + this.careerGoalId]);
  }
}
