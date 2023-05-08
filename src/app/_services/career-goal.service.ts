import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';

import { environment } from '../../_environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CareerGoalService {

	constructor(private _apiService: JWTApiService) {

	}

	getCareerGoalById(id: number) {
		if (isNaN(id))
			console.trace("An invalid ID was passed to getCareerGoalById()")

		let url = environment.apiUrl + "/api/careergoal/" + id;

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data: any) => {
						console.log("Call to getCareerGoalById(" + id + ") returned")
						console.log(data)
						resolve(data);
					}, (err: any) => {
						reject(err);
					});
			}
			);

		return rtn;
	}

	getAllCareerGoals() {
		let url = environment.apiUrl + "/api/careergoal/all"

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data: any) => {
						console.log("Call to getAllCareerGoals() returned")
						console.log(data)
						resolve(data);
					}, (err: any) => {
						reject(err);
					});
			}
			);

		return rtn;
	}

	save(careerGoal: any, pathAssociations: any) {
		let url = environment.apiUrl + '/api/careergoal/save'

		return new Promise(
			(resolve, reject) => {
				this._apiService.postUnsecuredAPI_w_body(url, {careergoal: careerGoal, pathassociations: pathAssociations}).subscribe(
					(data: any) => {
						resolve(data)
					}, (err: any) => {
						reject(err)
					});
			});
	}


	getCareerGoalForUserId(userId: number) {
		let url = environment.apiUrl + "/api/user/" + userId + "/careergoal/";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data: any) => {
						console.log("Career Goal for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err: any) => {
						reject(err);
					});
			});

		return rtn;
	}

	getNextQuestionsForCareerGoal(userId: number, careerGoalId: number) {
		let url = environment.apiUrl + "/api/user/" + userId + "/careergoal/" + careerGoalId + "/questions";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data: any) => {
						console.log("Next Questions Toward Career Goal for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err: any) => {
						reject(err);
					});
			});

		return rtn;
	}

	getQuestionsAlreadyAskedInThisSession(userId: number, sessionId: number) {
		let url = environment.apiUrl + "/api/user/" + userId + "/mockinterviewsession/" + sessionId + "/questions";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data: any) => {
						console.log("Questions Already Asked In This session for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err: any) => {
						reject(err);
					});
			});

		return rtn;
	}
}
