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
		User.findOne(1).exec(function foundUser(err,profile){
			if(err) res.redirect('/');
			res.view({
			user:user
		});
		});
		
		
	},

	create:function(req,res,next){
			Profile.create(req.params.all(),function customerCreated(err,profile){
				if (err) return next(err)
					
				res.redirect('/profile/show'+ profile.owner);
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id')).populateAll().exec( function (err,profile){
			if (err) throw next(err)
				res.view({
					profile:profile
				});
		});
	},
};

