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
		User.findOne(req.param('id'), function (err,user){
			res.view({
				user:user
			});
		});
	},

	create:function(req,res,next){
		req.file('file_upload').upload({dirname:'/images/'},function(err,files){
			console.log(files);
			if(err){
				res.redirect('/');
			}
			var filepath=files[0].fd;
			console.log("filepath"+filepath);
			Proposal.create(req.params.all(),function customerCreated(err,proposal){
				if (err) return next(err);
				console.log('going to update file')
					Proposal.update({owner:proposal.id},{fd:filepath}).exec(function fileAdded(err,proposal){
						if(err) return next(err);
						console.log('updated with out error');
						res.redirect('/proposal/show/'+proposal.id);
					})
									
				});
		})
	},
	show:function(req,res,next){
		User.findOne(req.param('id')).populateAll().exec( function (err,user){
			if (err) return next(err)
				res.view({
					user:user
				});
		});
	},
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser (err,proposal){
			if(err) return next(err);
			res.view({
				user:user
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

