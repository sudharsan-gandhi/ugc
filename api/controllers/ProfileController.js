	/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		// req.session.authenticated="false";
		// console.log(req.session);
			User.findOne(req.param('id')).exec(function foundUser(err,profile){
				if(err) res.redirect('/');
				res.view({
					profile:profile
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
		Profile.findOne(req.param('id'),function foundUser (err,profile){
			if (err) throw next(err)
				res.view({
					profile:profile
				});
		});
	},
	edit: function(req,res,next){
		Profile.findOne(req.param('id'), function foundUser (err,profile){
			if(err) return next(err);
			
			res.view({
				profile:profile
			});
		});
	},
	update: function(req,res,next){
		Profile.update(req.param('id'),req.params.all(),function userUpdated (err){
			if(err){
				return res.redirect('/profile/edit/' +req.param('id'));
			}
			res.redirect('profile/show/' +req.param('id'));
		});
	}  
};

