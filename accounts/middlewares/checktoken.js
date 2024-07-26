const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {

    let token = req.get('token'); //先取得token
    if(!token){
      return res.json({
          code: '0001',
          msg: '請先登入',
          data: null
        
    })
  }

  jwt.verify(token, 'secret' , (err, data) => {
    if(err){
      return res.json({
        code: '2004',
        msg: 'token驗證失敗',
        data: null

    })
    }
    else{
        a = data.username;
        next();
    }

    });

}
