var express = require('express');
var router = express.Router();
const SignedModel = require('../../models/signedModel');
const jwt = require('jsonwebtoken');
const md5 = require('md5');





 //登入



router.post('/login',(req,res) =>{
   let {username,password} =req.body;
   SignedModel.findOne({username,password:md5(password)} )
   .then(data =>{
    if(!data){
        return res.json({  //不寫return 會一直執行下去
            code:200,
            msg : "用戶名或密碼錯誤",
            data:null
    
        })    }
    else{
        //創建token
        let token = jwt.sign({
            username:data.username},
            'secret',
            {expiresIn: 60*60*7*24

            });


        res.json({
            code:200,
            msg : "登入成功",
            data: token
        })
        


    }
    
})
.catch(err =>{
    
    res.status(500).send("登入失敗請重新輸入");
    res.json({
        code:200,
        msg : "數據庫讀取失敗",
        data:null

    })
});

})

router.post('/logout', (req,res) =>{
    req.session.destroy(()=>{
        res.render('success' , {msg : "登出成功",url:'/login' })
    });
});

module.exports = router;

