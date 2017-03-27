/**
 * UserController
 *
 * @description :: Server-side logic for managing users
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
				if (err) return next(err)
					res.redirect('/user/show/'+user.id);
		});
	},

	show:function(req,res,next){
		User.findOne(req.param('id'),function showUser(err,user){
			if (err) throw next(err)
				res.view({
					user:user
				})
		})
	},
	auth:function(req,res,next){
		User.find({'email':req.param('email')}).exec(function loginUser(err,user){
			if(err) return next(err)
				console.log(user[0].password);
				 // sails.log(user.password);
				 if(user[0].password==req.param('password')){
					console.log('in');
					req.session.authenticated=true;
					res.redirect('/user/show/'+user[0].id);
				}else
					res.redirect('/');
		})
	}
};

