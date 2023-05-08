import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";

import { MilestonesService } from "../_services/milestones.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.page.html',
  styleUrls: ['./milestones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ MilestonesService, JWTApiService, HttpClient ]
})
export class MilestonesPage implements OnInit {

  milestones: any = undefined;

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _milestoneService: MilestonesService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe(() => {
      self._milestoneService.getAllMilestones().then((milestones: any) => {
        self.milestones = milestones.sort((a: any,b: any) => { return a['name'].localeCompare(b['name']); });
      })
    })
  }

  getAllMilestones() {
    return this.milestones;
  }

  onMilestoneClick(m: any) {
    this._router.navigate(['/milestones/display/' + m['id']]);
  }

  onNewMilestoneBtnClick() {
    // todo: implement
  }
}
