function isLogin(req, res, next) {
  console.log(req.session.id, "<===== masuk dari session");
  next()
}

module.exports = isLogin