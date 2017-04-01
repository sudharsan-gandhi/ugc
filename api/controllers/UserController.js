/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		// req.session.authenticated="false";
		res.view();
	},

	create:function(req,res,next){
					console.log(JSON.stringify(req.params.all()));
			User.create(req.params.all(),function customerCreated(err,user){
				if(err) {
						req.session.flash={err:err};
						
					}
					if(err) res.redirect('/');
					// console.log(JSON.stringify(user))
					res.redirect('/user/show/'+user.id);
		});
	},

	show:function(req,res,next){
		User.findOne(req.param('id'),function showUser(err,user){
			if(err) {
				req.session.flash={err:err};
				res.redirect('/');
			}
			res.view({
				user: user
			})
		})
	},
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUser (err,user){
			if(err) return next(err);
			
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
			res.redirect('user/show/' +req.param('id'));
		});
	},  
	auth:function(req,res,next){
		User.findOneByEmail(req.param('email')).exec(function loginUser(err,user){
			if(err) return next(err)
				console.log(user.password);
				 // sails.log(user.password);
				 if(user.password==req.param('password')){
					console.log('in');
					req.session.authenticated=true;
					if(user.role==='user'){
						res.redirect('/user/dashboard/'+user.id);
					}else if (user.role==='admin') {
						res.redirect('/user/admin/'+user.id);
					}else{
						res.redirect('/');
					}
				}else
					res.redirect('/');
		})
	},
	users:function(req,res,next){
		User.find(function(err,users){
			if(err) return next(err)
				res.view({users:users});
		})
	},
	dashboard:function(req,res,next){
		User.findOne(req.param('id'),function dashboard(err,user){
			res.view({user:user});
		})
	},
	admin:function(req,res,next){
		User.findOne(req.param('id'),function adminDashboard(err,admin){
			res.view({
				admin:admin
			})
		})
	},
	delete:function(req,res,next){
		User.destroy(req.param('id')).exec(function(err){
			if(err) throw err
				res.redirect('/');
			})
	}
};

