var express = require('express');
var router = express.Router();
var db = require('../database/models');

/* 首页 */
router.get('/', function(req, res) {
    res.render('index', { title: '首页' });
});

/*主页*/
router.get('/home', function(req, res) {
	authentication(res,req)
	res.render('home', { title: '主页' });
});

/*注销*/
router.get('/logout', function(req, res) {
	delete req.session.user;
    res.redirect('/login');
});

/*注册*/
router.route('/reg').get(function(req, res) {
    res.render('reg', { title: '账户注册' });
 })
.post(function(req,res){
	var model = {
		id: Math.random(),
		username : req.body.username,
		password : req.body.password
	};
	db.insert('users',model);
	req.session.user = model;
	res.redirect('/home');
 });

/*登录*/
router.route('/login').get(function(req, res) {
    if (req.session.user) {
         res.redirect('/home');
     }else{
     	res.render('login', { title: '用户登录' });
     }     
}).post(function(req, res) {
	console.dir(req.body);
	var model = {
		username : req.body.user.name,
		password : req.body.user.password
	};
	if(req.session.user){
		res.redirect('/home');
	}
	else{
		var item = db.find('users',{'username':model.username,'password':model.password});
		if(item){
			req.session.user = item;
		}else{
	    	req.session.error='用户名或密码不正确';
	    	res.redirect('/login');
		}
	}
});

function authentication(res,req){
	if(!req.session.user){
		req.session.error = '请登录';
		res.redirect('/login');
	}
}

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

module.exports = router;