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
		req.file('file_upload').upload({dirname:'F:/Projects/sails project/ugc/assets/uploads'},function(err,files){
			if(err){
				res.redirect('/');
			}
			var filepath=files[0].fd;
			Proposal.create(req.params.all(),function customerCreated(err,proposal){
				if (err) return next(err);
					Proposal.update(proposal.id,{fd:filepath}).exec(function fileAdded(err,proposal){
						if(err) return next(err);
						res.redirect('/proposal/show/'+proposal[0].id);
					})
									
				});
		})
	},
	show:function(req,res,next){
		Proposal.findOne(req.param('id'), function showProposal(err,proposal){
			if (err) return next(err)
				console.log(proposal);
				res.view({
					proposal:proposal
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
	},
	document:function(req,res,next){
		Proposal.findOne(req.param('id'),function document(err,document){
			var skipperdisk=require('skipper-disk');
			var fileAdapter=skipperdisk();
			res.set("Content-disposition", "attachment; filename='download.pdf'");
			fileAdapter.read(document.fd)
    			.on('error', function (err){
     		return res.serverError(err);
    		})
    	.pipe(res);
		})
	}  

};

