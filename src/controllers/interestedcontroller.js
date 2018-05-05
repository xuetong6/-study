'use strict';
import interestedModel from '../models/interestedModel';
let studentInterested = {
	index() {
		return async(ctx, next) => {
			const _interestedModels = new interestedModel(ctx);

			const _coursedata = await _interestedModels.getStundentData();


			var objLengths = Object.keys(_coursedata.result).length



			if (objLengths < 1) {
				ctx.body = {
					skills: "",
					space: "",
					salary: "",
					description: "",
				}
			} else if (objLengths > 3) {
				ctx.body = {
					skills: _coursedata.result.skills,
					space: _coursedata.result.space,
					salary: _coursedata.result.salary,
					description: _coursedata.result.description,
				}
			}


		}
	}
};
export
default studentInterested;