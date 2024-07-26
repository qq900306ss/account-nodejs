var express = require('express');
var router = express.Router();

// const low = require('lowdb') //用不到了
// const FileSync = require('lowdb/adapters/FileSync')
 
// const adapter = new FileSync(__dirname +'/../data/db.json')
// const db = low(adapter) //用不到了

// const shortid = require('shortid');

const AccountSchema = require('../../models/AccountModel');

const moment = require('moment');
const mongoose = require('mongoose');

// 封裝起來
let checkLogin = require('../../middlewares/checkLogin');


router.get('/',(req, res)=> {
  res.redirect('/account');
});

//記帳本的列表
router.get('/account', checkLogin, function(req, res, next) {
  // let accounts = db.get('accounts').value(); 讀本地json的

  let user = req.session.username //找集合名稱
  let AccountModel = mongoose.model(user, AccountSchema); // 把帳號名稱的集合導入
  AccountModel.find().sort({time:-1}).exec({

  })
  .then(data =>{

    res.render('list', {accounts:data, moment:moment});
    
  })
  .catch(err => { 
      res.status(500).send('讀取錯誤');
  });

  
});

//添加紀錄
router.get('/account/create',checkLogin, function(req, res, next) {
  
  res.render('create');
});

router.post('/account' ,checkLogin, (req, res) =>{
  let user = req.session.username //找集合名稱
  let AccountModel = mongoose.model(user, AccountSchema); // 把帳號名稱的集合導入
  AccountModel.create({ 
    ...req.body, // ...可以讀取type
    time : moment(req.body.time).toDate() 
  })
  .then(data => {
    res.render('success' , {msg : '記帳成功' , url : '/account'});

  })
  .catch(err => { 
      res.status(500).send('插入錯誤');
  });

  });

router.get('/account/:id'  ,checkLogin, (req, res) =>{

  let id = req.params.id;
  let user = req.session.username //找集合名稱
  let AccountModel = mongoose.model(user, AccountSchema); // 把帳號名稱的集合導入
  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id:id})
  .then(data => {
    res.render('remove' , {msg : '刪除成功' , url : '/account'});
  })
  .catch(err => { 
      res.status(500).send('刪除錯誤');
  })
});


module.exports = router;
