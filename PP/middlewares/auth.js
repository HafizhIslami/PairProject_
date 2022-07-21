function isLogin(req, res, next) {
  if (req.session.UserId) {
    next()
    return
  }
  res.redirect('/login?error=Login First');
}

module.exports = isLogin