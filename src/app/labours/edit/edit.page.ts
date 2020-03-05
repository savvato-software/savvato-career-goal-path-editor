import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LaboursService } from '../../_services/labours.service'
import { QuestionService } from '../../_services/question.service'

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

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionsService: QuestionService,
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
						self.questions = allQuestions.map(
							(l) => { 
								l['isSelected'] = self.labour['questions']
									.map((l1) => l1['id'])
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

	isSaveBtnEnabled() {
		return this.isDirty() && this.questions.find((question) => question && question['isSelected']);
	}

	onMilestoneSelectionChanged(evt) {
		this.setDirty();
	}

	onSaveBtnClick() {
		this._labourService.save(this.labour, this.questions.filter(l => l && l['isSelected']).map(l => l['id']).join()).then((labour) => {
			this.labour = labour;
			this.dirty = false;
		})
	}
}
