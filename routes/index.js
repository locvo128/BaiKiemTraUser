var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://locls128:locls128@cluster0.erwqzoa.mongodb.net/test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

//create collesion 
let userSchema = mongoose.Schema({
  Phone: {
    type: Number,
  },
  Password: {
    type: String,
  },
  TypeRegister: {
    type: String,
  },
  TokenLogin: {
    type: String,
  },
  DeviceID: {
    type: String,
  },
  FcmTokens: {
    type: String,
  }
});

let user = mongoose.model('user', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  user.find({}, (error, data)=>{
    res.render('index', {users: data});
  });
});

router.get('/form-add', function (req, res, next){
  res.render('form-add', {});
})

router.post('/add', function(req, res, next){
  user.create(req.body);
  res.redirect('/');
})

router.get('/form-update/:id', function (req, res, next){
  user.findById(req.params.id, (error, data)=>{
    res.render('form-update', {user: data});
  });
})

router.post('/update', function(req, res, next){
  user.findByIdAndUpdate(req.body.id, req.body, (error, data)=>{
    res.redirect('/');
  });
});

router.get('/form-delete/:id', function (req, res, next){
  user.findByIdAndDelete(req.params.id, (error, data)=>{
    res.redirect('/');
  });
})

module.exports = router;
