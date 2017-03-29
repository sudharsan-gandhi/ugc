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
			User.findOne(req.param('owner')).exec(function foundUser(err,user){
				if(err) res.redirect('/');
				res.view({
					user:user
				});
		});
		
	},

	create:function(req,res,next){
			User.create(req.params.all(),function customerCreated(err,user){
				if (err) return next(err)
				res.redirect('/profile/show'+ user.owner);
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id'),function foundUser (err,user){
			if (err) throw next(err)
				res.view({
					user:user
				});
		});
	},
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser (err,user){
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist.');
			res.view({
				user:user
			});
		});
	},
	update: function(req,res,next){
		User.update(req.param('id'),req.params.all(),function userUpdated (err){
			if(err){
				return res.redirect('/profile/edit/' +req.param('id'));
			}
			res.redirect('profile/show/' +req.param('id'));
		});
	}  
};

