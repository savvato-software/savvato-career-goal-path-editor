import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MilestonesService } from '../../_services/milestones.service'
import { LaboursService } from '../../_services/labours.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	dirty = false;
	isNew = true;

	milestoneId = undefined;
	milestone = undefined;
	labours = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _laboursService: LaboursService,
			    private _milestoneService: MilestonesService) {

	}

	ngOnInit() {
		let self = this;

		self._route.params.subscribe((params) => {
			self.milestoneId = params['milestoneId'];

			self.milestone = {id: -1, name: ''};

			if (self.milestoneId) { // this is an existing question.. it already has an id.
				self._milestoneService.getMilestoneById(self.milestoneId).then((cg) => {
					self.milestone = cg;
					self.isNew = false;

					self._laboursService.getAllLabours().then((allLabours: [{}]) => {
						self.labours = allLabours.map(
							(l) => { 
								l['isSelected'] = self.milestone['labours']
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

	getMilestoneName() {
		return this.milestone && this.milestone["name"];
	}

	getLabours() {
		return this.labours || []
	}

	onNameChange(evt) {
		this.milestone["name"] = evt.currentTarget.value;
		this.setDirty();
	}

	isSaveBtnEnabled() {
		return this.isDirty() && this.labours.find((labour) => labour && labour['isSelected']);
	}

	onMilestoneSelectionChanged(evt) {
		this.setDirty();
	}

	onSaveBtnClick() {
		this._milestoneService.save(this.milestone, this.labours.filter(l => l && l['isSelected']).map(l => l['id']).join()).then((milestone) => {
			this.milestone = milestone;
			this.dirty = false;
		})
	}

	onCancelBtnClick() {
		this._router.navigate(['/milestones/display/' + this.milestoneId])
	}
}
