import { Injectable } from '@angular/core';
import { JWTApiService } from "@savvato-software/savvato-javascript-services"

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboursService {

	constructor(private _apiService: JWTApiService) {

	}

	getLabourById(id: any) {
      let url = environment.apiUrl + "/api/labour/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getLabourById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getAllLabours() {
      let url = environment.apiUrl + "/api/labour/all"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getAllLabours() returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  save(labour: any, questionAssociations: any) {
    let url = environment.apiUrl + '/api/labour/save'

    return new Promise(
      (resolve, reject) => {
        this._apiService.postUnsecuredAPI_w_body(url, {labour: labour, questionassociations: questionAssociations}).subscribe(
          (data: any) => {
            resolve(data)
          }, (err: any) => {
            reject(err)
          });
      });
  }

}
