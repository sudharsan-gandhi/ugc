/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		req.session.authenticated="false";
		console.log(req.session);
		
		
		res.view();
	},

	create:function(req,res,next){
			User.create(req.params.all(),function customerCreated(err,user){
				if (err) return next(err)
					res.redirect('/user/login'+user.id);
		});
	},
};

