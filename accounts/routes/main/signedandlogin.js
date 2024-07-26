var express = require('express');
var router = express.Router();
const SignedModel = require('../../models/signedModel');


const md5 = require('md5'); //加密
//註冊


router.get('/signed', (req,res) =>{
    res.render('signed.ejs');
});
router.post('/signed',(req,res) =>{
    SignedModel.create({
        ...req.body,
        password : md5(req.body.password)
    })
    .then(data =>{
        res.render('signedsuccess' , {msg : "註冊成功",url:'/account' });

    })
    .catch(err =>{
        res.status(500).send("註冊失敗");
    });
});



 //登入

router.get('/login', (req,res) =>{
    res.render('login.ejs');
});

router.post('/login',(req,res) =>{
   let {username,password} =req.body;
   SignedModel.findOne({username,password:md5(password)} )
   .then(data =>{
    if(!data){
        res.render('wronglogin' , {msg : "帳號或密碼錯誤",url:'/login' });
    }
    else{
        
        req.session.username = data.username;
        req.session._id = data._id;
        res.render('signedsuccess' , {msg : "登入成功",url:'/account' });


    }
    
})
.catch(err =>{
    
    res.status(500).send("登入失敗請重新輸入");
});

})

router.post('/logout', (req,res) =>{
    req.session.destroy(()=>{
        res.render('success' , {msg : "登出成功",url:'/login' })
    });
});

module.exports = router;

