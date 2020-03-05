import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MilestonesService } from '../_services/milestones.service'

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.page.html',
  styleUrls: ['./milestones.page.scss'],
})
export class MilestonesPage implements OnInit {

	milestones = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _milestoneService: MilestonesService) {

	}

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self._milestoneService.getAllMilestones().then((milestones) => {
			self.milestones = milestones;
		})
	})
  }

  getAllMilestones() {
  	return this.milestones;
  }

  onMilestoneClick(m) {
	this._router.navigate(['/milestones/display/' + m['id']]);
  }
}
