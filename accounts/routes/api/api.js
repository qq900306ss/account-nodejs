var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const AccountSchema = require('../../models/AccountModel');

const moment = require('moment');
const mongoose = require('mongoose');
let checktoken =require('../../middlewares/checktoken');

//記帳本的列表
router.get('/account', checktoken,function(req, res, next) {
  // let accounts = db.get('accounts').value(); 讀本地json的
 


  
      let user = a;  // token包裏有解密後的user = a
      console.log(user);
      let AccountModel = mongoose.model(user, AccountSchema); 
      AccountModel.find().sort({time:-1}).exec({

      })
      .then(data =>{
    
        console.log(data);
        res.json({
            code: '0000',
            msg: '',
            data: data
        });
        
      })
      .catch(err => { 
          res.status(500).send('讀取錯誤');
      });
});

//添加紀錄



router.post('/account' , checktoken, (req, res) =>{
  
  AccountModel.create({
    ...req.body, // ...可以讀取type
    time : moment(req.body.time).toDate() 
  })
  .then(data => {
    res.json({
        code: '0000',
        msg: '新增成功',
        data: data
  
      })
  })
  .catch(err => { 
      res.status(500).send('插入錯誤');
  });

  });

router.delete('/account/:id'  , checktoken, (req, res) =>{

  let id = req.params.id;

  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id:id})
  .then(data => {
    res.json({
        code: '0000',
        msg: '刪除成功',
        data: {}
      })
  })
  .catch(err => { 
      res.json({
        code: '0001',
        msg: '刪除錯誤',
        data: null
      })

      })
  
});




module.exports = router;
