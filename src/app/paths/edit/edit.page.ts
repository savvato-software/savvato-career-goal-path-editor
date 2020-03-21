import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PathsService } from '../../_services/paths.service'
import { MilestonesService } from '../../_services/milestones.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	dirty = false;
	isNew = true;

	pathId = undefined;
	path = undefined;
	milestones = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _pathService: PathsService,
			    private _milestoneService: MilestonesService) {

	}

	ngOnInit() {
		let self = this;

		self._route.params.subscribe((params) => {
			self.pathId = params['pathId'];

			self.path = {id: -1, name: ''};

			if (self.pathId) { // this is an existing question.. it already has an id.
				self._pathService.getPathById(self.pathId).then((cg) => {
					self.path = cg;
					self.isNew = false;

					self._milestoneService.getAllMilestones().then((allMilestones: [{}]) => {
						self.milestones = allMilestones.map(
							(m) => { 
								m['isSelected'] = self.path['milestones']
									.map((m1) => m1['id'])
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

	onNameChange(evt) {
		this.path["name"] = evt.currentTarget.value;
		this.setDirty();
	}

	isSaveBtnEnabled() {
		return this.isDirty() && this.milestones.find((path) => path['isSelected']);
	}

	onMilestoneSelectionChanged(evt) {
		this.setDirty();
	}

	onSaveBtnClick() {
		this._pathService.save(this.path, this.milestones.filter(m => m['isSelected']).map(m => m['id']).join()).then((path) => {
			this.path = path;
			this.dirty = false;
		})
	}

	onCancelBtnClick() {
		this._router.navigate(['/paths/display/' + this.pathId])
	}
}
