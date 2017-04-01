/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	priority:{
  		type:'integer',
  		required:true,
  		min:1,
  		max:5
  	},
  	sender_id: {
  		type:'integer',
  		required:true
  	},
  	message: {
  		type: 'string',
  		required:true
  	},
  	receiver_id:{
  		type:'integer',
  		required:true
  	},
  	link:{
  		type:'string',
  		
  	},
  	owner:{
			model:'user',
			required:true
		}




  }
};

