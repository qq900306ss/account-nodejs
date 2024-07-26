let checkLogin = (req, res, next) => {
    if(!req.session.username){  //封裝起來
      return res.redirect('/login');
    }
    next();
  }

  module.exports = checkLogin;