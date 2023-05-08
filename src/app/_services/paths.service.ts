import { Injectable } from '@angular/core';
import { JWTApiService } from "@savvato-software/savvato-javascript-services"

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

	constructor(private _apiService: JWTApiService) {

	}

	getPathById(id: number) {
      let url = environment.apiUrl + "/api/path/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getPathById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  	}

	getAllPaths() {
      let url = environment.apiUrl + "/api/path/all"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getAllPaths() returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  save(path: any, milestoneAssociations: any) {
    let url = environment.apiUrl + '/api/path/save'

    return new Promise(
      (resolve, reject) => {
        this._apiService.postUnsecuredAPI_w_body(url, {path: path, milestoneassociations: milestoneAssociations}).subscribe(
          (data: any) => {
            resolve(data)
          }, (err: any) => {
            reject(err)
          });
      });
  }

}
