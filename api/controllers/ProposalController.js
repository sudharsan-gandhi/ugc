/**
 * ProposalController
 *
 * @description :: Server-side logic for managing proposals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		// req.session.authenticated="false";
		console.log(req.session);
		User.findOne(req.param('id'), function (err,proposal){
			res.view({
				proposal:proposal
			});
		});
	},

	create:function(req,res,next){
			User.create(req.params.all(),function customerCreated(err,proposal){
				if (err){
					 return res.redirect('/proposal/new')
					}
					res.redirect('/proposal/show/'+user.id);
				
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id')).populateAll().exec( function (err,proposal){
			if (err) throw next(err)
				res.view({
				proposalr:proposal
				});
		});
	},
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser (err,proposal){
			if(err) return next(err);
			
			res.view({
				proposal:proposal
			});
		});
	},
	update: function(req,res,next){
		User.update(req.param('id'),req.params.all(),function userUpdated (err){
			if(err){
				return res.redirect('/proposal/edit/' +req.param('id'));
			}
			res.redirect('proposal/show/' +req.param('id'));
		});
	}  

};

