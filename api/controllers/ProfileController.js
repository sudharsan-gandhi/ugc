/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res,err){
		User.findOne(req,param('owner'),function foundUser(err,user){
			if(err) return next (err);
			if(!user) return next();

		
		res.view({
			user:user
		});

	});
	},

	create:function(req,res,next){
			User.create(req.params.all(),function customerCreated(err,user){
				if (err) return next(err)
					res.redirect('/user/show/'+user.id);
		});
	},
};

