var express =require('express'),
	app = express(),
	mongoose=require('mongoose');

mongoose.connect('mongodb://william:postMachine22@ds047792.mongolab.com:47792/postmachine');

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.route('/login')
	.get(function(req,res){
		res.send('this is the login form');
	})
	.post(function(req,res){
		console.log('processing');
		res.send('processing the login form');
	});

var adminRouter = express.Router();

adminRouter.use(function(req,res,next){

	console.log(req.method,req.url);
	next();
});

adminRouter.param('name',function(req,res,next,name){
	if(name ==="william")
		console.log("Welcome Admin");
	req.name = name;
	next(); 


});

adminRouter.get('/',function(req,res){
	res.send('I am the dashboard');
});

adminRouter.get('/users',function(req,res){
	res.send('I show all the users!');
});

adminRouter.get('/posts',function(req,res){
	res.send("These are the posts");
});


adminRouter.get('/users/:name',function(req,res){
	res.send('hello '  + req.params.name);
});

app.use('/admin',adminRouter);



app.listen('1337');

console.log('listen on port 1337');