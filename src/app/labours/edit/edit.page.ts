import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LaboursService } from '../../_services/labours.service'
import { QuestionService } from '../../_services/question.service'
import { TechProfileModelService } from '../../_services/tech-profile-model.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	dirty = false;
	isNew = true;

	labourId = undefined;
	labour = undefined;
	questions = undefined;

	techProfileTopicFilter = undefined;
	techProfileLineItemFilter = undefined;

	selectedTopicFilterValue = undefined;
	selectedLineItemFilterValue = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionsService: QuestionService,
			    private _techProfileModelService: TechProfileModelService,
			    private _labourService: LaboursService) {

	}

	ngOnInit() {
		let self = this;

		self._route.params.subscribe((params) => {
			self.labourId = params['labourId'];

			self.labour = {id: -1, name: ''};

			if (self.labourId) { // this is an existing question.. it already has an id.
				self._labourService.getLabourById(self.labourId).then((cg) => {
					self.labour = cg;
					self.isNew = false;

					self._questionsService.getAllQuestions().then((allQuestions: [{}]) => {
						self.questions = self.setIsSelected(allQuestions, self.labour['questions']);
					});
				});
			}
		});

		self._techProfileModelService._init();
	}

	setIsSelected(array1, array2) {
		return array1.map(
			(val) => { 
				val['isSelected'] = array2.map((val2) => val2['id']).includes(val['id'])
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
		return this.questions || []
	}

	onNameChange(evt) {
		this.labour["name"] = evt.currentTarget.value;
		this.setDirty();
	}

	onQuestionSelectionChanged(evt) {
		this.setDirty();
	}

	getTechProfileTopics() {
		return this._techProfileModelService.getTopics();
	}

	getLineItemsOfTheSelectedTechProfileTopic() {
		return this._techProfileModelService.getLineItemsForATopic(this.techProfileTopicFilter['id']);
	}

	getFilterValue(obj) {
		return obj && obj['id'];
	}

	techProfileTopicFilterIsSet() {
		return !!this.techProfileTopicFilter;
	}

	onTopicFilterChange(evt) {
		if (evt.target.value) {
			this.techProfileTopicFilter = this._techProfileModelService.getTopics().find((t) => t['id'] === evt.target.value);

			this._questionsService.getByTopic(this.techProfileTopicFilter['id']).then((qArr) => {
				this.questions = this.setIsSelected(qArr, this.labour['questions']);
			})
		}
	}

	onLineItemFilterChange(evt) {
		if (evt.target.value) {		
			this.techProfileLineItemFilter = this._techProfileModelService.getLineItemsForATopic(this.techProfileTopicFilter['id']).find((li) => li['id'] === evt.target.value);

			this._questionsService.getByLineItem(this.techProfileLineItemFilter['id']).then((qArr) => {
				this.questions = this.setIsSelected(qArr, this.labour['questions']);
			})
		}
	}

	isSaveBtnEnabled() {
		return this.isDirty() && this.questions.find((question) => question && question['isSelected']);
	}

	onSaveBtnClick() {
		this._labourService.save(this.labour, this.questions.filter(l => l && l['isSelected']).map(l => l['id']).join()).then((labour) => {
			this.labour = labour;
			this.dirty = false;
		})
	}

	onCancelBtnClick() {
		this._location.back();
	}

	isResetFilterBtnEnabled() {
		return !!this.selectedTopicFilterValue;
	}

	onResetFilterBtnClick() {
		this.techProfileTopicFilter = undefined;
		this.techProfileLineItemFilter = undefined;

		this.selectedTopicFilterValue = undefined;
		this.selectedLineItemFilterValue = undefined;

		let self = this;
		self._questionsService.getAllQuestions().then((allQuestions: [{}]) => {
			self.questions = self.setIsSelected(allQuestions, self.labour['questions']);
		});
	}
}
