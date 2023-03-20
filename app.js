
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose =
		require("passport-local-mongoose");
//  const LocalStorage= require('localStorage');
//   const localStorage = new LocalStorage("./localstorage");	;

const User = require("./model/User");

//const nmostRecentScore =require(nmostRecentScore)
//const Score=require("./public/js/end");
// console.log(Score);


var app = express();
mongoose.connect("mongodb://127.0.0.1/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require("express-session")({
	secret: "my bestf is cool no",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function (req, res) {
	res.render("homee");
});
app.get("/about",function(req,res){
	res.render("about");
}),
app.get("/contact",function(req,res){
	res.render("contact");
}),
app.get("/home",function(req,res){
	res.render("homee");
})
// app.get("/play",function(req,res){
// 	res.render("game");
// })
app.get("/end",function(req,res){
	res.render("end");
})


//app.get("/secret", isLoggedIn, function (req, res) {
//	res.render("secret");
//});


app.get("/register", function (req, res) {
	res.render("registerr");
});
// app.get("/save",function(req,res){
// 	res.render("secrett");
// })



app.post("/register", async (req, res) => {
	
	

	// //return res.status(200).json(user);
	// 
	// }
	try {
		const { username, password, name } = req.body;
		const getUser = await User.findOne({ username }).exec();
		if(getUser){
			
			
			//res.json({ msg: "The user already exists" })
			res.send('<script>alert("User Already exists")</script>');
			// res.redirect('/');
			
			
		}else{
			const user = await User.create({
				username: req.body.username,
				name:req.body.name,
				password: req.body.password,
				cpassword:req.body.cpassword
			});
			if(req.body.password===req.body.cpassword){
				// 	res.status(400).json({ error: "passwords do.cpassword){
				// res.render('secrett');}
				res.render("secrett");}
				 else{
				res.send('<script>alert("passwords dont match")</script>');
				 }
			// res.json({ msg: "your account had been created",user:user })
			
		}
		console.log(getUser)
	} catch (error) {
		
	}

});
app.get("/login", function (req, res) {
	res.render("loginn");
});
app.get("/loader",function (req,res){
    res.render("loader");
});
app.get("/play",function(req,res){
	res.render("secrett");
}
);
app.get("/game",function(req,res){
	res.render("game");
})
app.post("/save",  async(req,res)=> {
try{
	console.log("saving score");
	const getuser = await User.findOne({ username: req.body.username });
	var score;
	// console.log("score is ",mscore);
	if (getuser) {
		
		const user = await User.findOneAndUpdate({ username:req.body.username},
			{ gamescore: score});
	}
	res.render('secrett');
	// console.log(mscore);
}
catch(error){
	console.log(error);
}
});


app.post("/login", async function(req, res){
	try {
		
		const getuser = await User.findOne({ username: req.body.username });
		if (getuser) {
		
		const result = req.body.password === getuser.password;
		if (result) {
			res.render("secrett");
		} else {
			res.send('<script>alert("passwords dont match")</script>');
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
		console.log(getuser);
	} catch (error) {
		res.status(400).json({ error });
	}
});
 

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000
app.listen(port, function () {
	console.log("Server Has Started!");
});
