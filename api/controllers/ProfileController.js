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
		// User.findOne(req.param('owner')).exec(function foundUser(err,user){
		// 	if(err) res.redirect('/');
		// 	res.view({
		// 	user:user
		// });
		// });
		// testing purpose only
		res.view({
			user:1
		});
		
	},

	create:function(req,res,next){
			Profile.create(req.params.all(),function customerCreated(err,profile){
				if (err) return next(err)
					
				res.redirect('/user/show'+ profile.owner);
		});
	},
};

