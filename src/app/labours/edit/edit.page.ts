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

	onlyShowSelectedFilter = false;

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

					self._questionsService.getAllQuestions().then((qArr: [{}]) => {
						this.questions = this.setAnyMatchingQuestionsToSelected(qArr, this.labour['questions']);				
					})
				});
			}
		});

		self._techProfileModelService._init();
	}

	setAnyMatchingQuestionsToSelected(array1, array2) {
		return array1.map(
			(val) => { 
				val['isSelected'] = val['isSelected'] || array2.map((val2) => val2['id']).includes(val['id'])
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
			let rtn = this.questions.sort((a,b) => {
				if (a['isSelected'] && !b['isSelected']) {
					return -1;
				} else if (!a['isSelected'] && b['isSelected']) {
					return 1;
				}

				return a['text'].localeCompare(b['text'])
			});

			if (this.onlyShowSelectedFilter === true) {
				rtn = rtn.filter((q) => q['isSelected']);
			}

			return rtn;
		} else {
			return [];
		}
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
			let selectedQuestions = this.questions.filter((q) => q['isSelected']);

			this.techProfileTopicFilter = this._techProfileModelService.getTopics().find((t) => t['id'] === evt.target.value);

			this._questionsService.getByTopic(this.techProfileTopicFilter['id']).then((qArr: [{}]) => {
				this.questions = this._buildListOfQuestionsMatchingFilter(selectedQuestions, qArr);
			})
		}
	}

	onLineItemFilterChange(evt) {
		if (evt.target.value) {
			let selectedQuestions = this.questions.filter((q) => q['isSelected']);

			this.techProfileLineItemFilter = this._techProfileModelService.getLineItemsForATopic(this.techProfileTopicFilter['id']).find((li) => li['id'] === evt.target.value);

			this._questionsService.getByLineItem(this.techProfileLineItemFilter['id']).then((qArr: [{}]) => {
				this.questions = this._buildListOfQuestionsMatchingFilter(selectedQuestions, qArr);
			})
		}
	}

	_buildListOfQuestionsMatchingFilter(selectedQuestions, qArr) {
		let list = [];
		list = list.concat(selectedQuestions);

		let qArr2 = this.setAnyMatchingQuestionsToSelected(qArr, this.labour['questions']);
		list = list.concat(qArr2.filter((q) => !selectedQuestions.map((q1) => q1['id']).includes(q['id'])))

		return list;
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
		this._router.navigate(['/labours/display/' + this.labourId]);
	}

	isResetFilterBtnEnabled() {
		return !!this.selectedTopicFilterValue;
	}

	onOnlyShowSelectedFilterBtnClick() {
		this.onlyShowSelectedFilter = !this.onlyShowSelectedFilter;
	}

	onResetFilterBtnClick() {
		this.techProfileTopicFilter = undefined;
		this.techProfileLineItemFilter = undefined;

		this.selectedTopicFilterValue = undefined;
		this.selectedLineItemFilterValue = undefined;

		let self = this;
		let selectedQuestions = this.questions.filter((q) => q['isSelected']);
		self._questionsService.getAllQuestions().then((qArr: [{}]) => {
			let list = [];
			list = list.concat(selectedQuestions);
			list = list.concat(qArr.filter((q) => !selectedQuestions.map((q1) => q1['id']).includes(q['id'])))

			this.questions = this.setAnyMatchingQuestionsToSelected(list, this.labour['questions']);				
		})
	}
}
