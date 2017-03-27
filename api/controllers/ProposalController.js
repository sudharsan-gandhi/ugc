/**
 * ProposalController
 *
 * @description :: Server-side logic for managing proposals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	attributes: {
		broad_subject: {
			type: 'string',
			required: true
		},
		project_title: {
			type: 'string',
			numeric: true,
			required: true
		},
		project_duration: {
			type:'datetime',
			required: true

		},
		estimated_budget: {
			type:'integer',
			min:0,
			required:true
		}

	}
};

