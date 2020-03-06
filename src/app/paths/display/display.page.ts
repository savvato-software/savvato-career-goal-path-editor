import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PathsService } from '../../_services/paths.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	path = undefined;
	pathId = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _pathsService: PathsService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.pathId = params['pathId'];

			self._pathsService.getPathById(self.pathId).then((path) => {
				self.path = path;
			})
		})
	}

	getPath() {
		return this.path;
	}

	getPathName() {
		return this.path && this.path['name']
	}

	getPathMilestones() {
		return this.path && this.path['milestones'];
	}

	onEditPathBtnClick() {
		this._router.navigate(['/paths/edit/' + this.pathId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
