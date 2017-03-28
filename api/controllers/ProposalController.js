/**
 * ProposalController
 *
 * @description :: Server-side logic for managing proposals
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
				if (err){
					 return res.redirect('/user/new')
					}
					res.redirect('/user/show/'+user.id);
				
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id')).populateAll().exec( function (err,user){
			if (err) throw next(err)
				res.view({
					user:user
				});
		});
	},
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser (err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});
		});
	}

};

