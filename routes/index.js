const express = require('express');
const router = express.Router();
const UserModel =require('./users');
const PostModel = require('./post');
const passport = require('passport');
//Now user is Authenticate
const localStrategy = require('passport-local');
passport.use(new localStrategy(UserModel.authenticate()))


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  // next();
});
//
router.get('/login', function(req, res) {
  res.render('login');
  // next();
});


//Profile Route
router.get('/profile',isLongedIn,(req,res,next) => {
res.render('profile')
})


//Post Router
router.post('/register', (req,res) => {
 const {username,email,fullname} = req.body;
 const userData = new UserModel({username,email,fullname}); 
 UserModel.register(userData,req.body.password)
 .then( () => {
  passport.authenticate("local")(req,res,() => {
    res.redirect("/profile")
  })
 })
});
 
//User is Login 
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),(req,res) => {
});

//If user is LogOut then thay have need to again singIn 
router.get('logout',(req,res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//
function isLongedIn(req,res,next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
