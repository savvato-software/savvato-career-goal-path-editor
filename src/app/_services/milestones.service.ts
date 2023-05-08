import { Injectable } from '@angular/core';
import { JWTApiService } from "@savvato-software/savvato-javascript-services"

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilestonesService {

	constructor(private _apiService: JWTApiService) {

	}

	getMilestoneById(id: number) {
      let url = environment.apiUrl + "/api/milestone/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getMilestoneById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getAllMilestones() {
      let url = environment.apiUrl + "/api/milestone/all"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getAllMilestones() returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  save(milestone: any, labourAssociations: any) {
    let url = environment.apiUrl + '/api/milestone/save'

    return new Promise(
      (resolve, reject) => {
        this._apiService.postUnsecuredAPI_w_body(url, {milestone: milestone, labourassociations: labourAssociations}).subscribe(
          (data: any) => {
            resolve(data)
          }, (err: any) => {
            reject(err)
          });
      });
  }
}
