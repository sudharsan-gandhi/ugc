/**
 * Proposal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	broad_subject: {
			type: 'string',
			required: true
		},
		college_account_number: {
			type: 'string',
			numeric:true,
			required: true

		},
		college_approval_status: {
			type: 'boolean',
			required: true
		},
		undertaking_college_name: {
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
		},
		owner:{
			model:'proposal',
			required:true
		}

  }
};

