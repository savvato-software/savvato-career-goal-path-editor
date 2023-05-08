import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LaboursService } from "../../_services/labours.service";
import {QuestionService} from "../../_services/question.service";
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {JWTApiService} from "@savvato-software/savvato-javascript-services";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { environment } from "../../../_environments/environment";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ LaboursService, QuestionService, SkillsMatrixModelService, SkillsMatrixAPIService, JWTApiService, HttpClient ]
})
export class EditPage implements OnInit {
  dirty: boolean = false;
  isNew: boolean = true;

  labourId: number = -1;
  labour: any = undefined;
  questions: any = undefined;

  skillsMatrixTopicFilter: any = undefined;
  skillsMatrixLineItemFilter: any = undefined;

  selectedTopicFilterValue: any = undefined;
  selectedLineItemFilterValue: any = undefined;

  onlyShowSelectedFilter: boolean = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _questionsService: QuestionService,
              private _skillsMatrixModelService: SkillsMatrixModelService,
              private _labourService: LaboursService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);

    self._route.params.subscribe((params: any) => {
      self.labourId = params['labourId'];

      self.labour = {id: -1, name: ''};

      if (self.labourId) { // this is an existing question.. it already has an id.
        self._labourService.getLabourById(self.labourId).then((cg: any) => {
          self.labour = cg;
          self.isNew = false;

          self._questionsService.getAllQuestions().then((qArr: any) => {
            this.questions = this.setAnyMatchingQuestionsToSelected(qArr, this.labour['questions']);
          })
        });
      }
    });

    self._skillsMatrixModelService._init(1, true);
  }

  setAnyMatchingQuestionsToSelected(array1: any, array2: any) {
    return array1.map(
      (val: any) => {
        val['isSelected'] = val['isSelected'] || array2.map((val2: any) => val2['id']).includes(val['id'])
        return val;
      }
    );
  }

  isDirty() {
    return this.dirty;
  }

  setDirty() {
    this.dirty = true;
  }

  getLabourName() {
    return this.labour && this.labour["name"];
  }

  getQuestions() {
    if (this.questions) {
      let rtn = this.questions.sort((a: any,b: any) => {
        if (a['isSelected'] && !b['isSelected']) {
          return -1;
        } else if (!a['isSelected'] && b['isSelected']) {
          return 1;
        }

        return a['text'].localeCompare(b['text'])
      });

      if (this.onlyShowSelectedFilter === true) {
        rtn = rtn.filter((q: any) => q['isSelected']);
      }

      return rtn;
    } else {
      return [];
    }
  }

  onNameChange(evt: any) {
    this.labour["name"] = evt.currentTarget.value;
    this.setDirty();
  }

  onQuestionSelectionChanged(evt: any) {
    this.setDirty();
  }

  getTechProfileTopics() {
    return this._skillsMatrixModelService.getTopics();
  }

  getLineItemsOfTheSelectedTechProfileTopic() {
    return this._skillsMatrixModelService.getLineItemsForATopic(this.skillsMatrixTopicFilter['id']);
  }

  getFilterValue(obj: any) {
    return obj && obj['id'];
  }

  skillsMatrixTopicFilterIsSet() {
    return !!this.skillsMatrixTopicFilter;
  }

  onTopicFilterChange(evt: any) {
    if (evt.target.value) {
      let selectedQuestions = this.questions.filter((q: any) => q['isSelected']);

      this.skillsMatrixTopicFilter = this._skillsMatrixModelService.getTopics().find((t: any) => t['id'] === evt.target.value);

      this._questionsService.getByTopic(this.skillsMatrixTopicFilter['id']).then((qArr: any) => {
        this.questions = this._buildListOfQuestionsMatchingFilter(selectedQuestions, qArr);
      })
    }
  }

  onLineItemFilterChange(evt: any) {
    if (evt.target.value) {
      let selectedQuestions = this.questions.filter((q: any) => q['isSelected']);

      this.skillsMatrixLineItemFilter = this._skillsMatrixModelService.getLineItemsForATopic(this.skillsMatrixTopicFilter['id']).find((li: any) => li['id'] === evt.target.value);

      this._questionsService.getByLineItem(this.skillsMatrixLineItemFilter['id']).then((qArr: any) => {
        this.questions = this._buildListOfQuestionsMatchingFilter(selectedQuestions, qArr);
      })
    }
  }

  _buildListOfQuestionsMatchingFilter(selectedQuestions: any, qArr: any) {
    let list: any = [];
    list = list.concat(selectedQuestions);

    let qArr2: any = this.setAnyMatchingQuestionsToSelected(qArr, this.labour['questions']);
    list = list.concat(qArr2.filter((q: any) => !selectedQuestions.map((q1: any) => q1['id']).includes(q['id'])))

    return list;
  }

  isSaveBtnEnabled() {
    return this.isDirty() && this.questions.find((question: any) => question && question['isSelected']);
  }

  onSaveBtnClick() {
    this._labourService.save(this.labour, this.questions.filter((l: any) => l && l['isSelected']).map((l: any) => l['id']).join()).then((labour: any) => {
      this.labour = labour;
      this.dirty = false;
    })
  }

  onCancelBtnClick() {
    this._router.navigate(['/labours/display/' + this.labourId]);
  }

  isResetFilterBtnEnabled() {
    return !!this.selectedTopicFilterValue;
  }

  onOnlyShowSelectedFilterBtnClick() {
    this.onlyShowSelectedFilter = !this.onlyShowSelectedFilter;
  }

  onResetFilterBtnClick() {
    this.skillsMatrixTopicFilter = undefined;
    this.skillsMatrixLineItemFilter = undefined;

    this.selectedTopicFilterValue = undefined;
    this.selectedLineItemFilterValue = undefined;

    let self = this;
    let selectedQuestions: any = this.questions.filter((q: any) => q['isSelected']);
    self._questionsService.getAllQuestions().then((qArr: any) => {
      let list: any = [];
      list = list.concat(selectedQuestions);
      list = list.concat(qArr.filter((q: any) => !selectedQuestions.map((q1: any) => q1['id']).includes(q['id'])))

      this.questions = this.setAnyMatchingQuestionsToSelected(list, this.labour['questions']);
    })
  }
}
