const {Post, Profile, Tag, User} = require('../models')
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    Controller.loginForm()
  }
  static loginForm(req, res){
    res.render('')
  }
  static login(req, res){
    const {username, password} = req.body
    let encrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    User.findOne({where: {
      username,
      password: encrypt,
    }})
    .then(result => {
      // ---------------
    })
    .catch(err => {
      // ---------------
    })
  }
  static createAccount(req,res){
    const {username, password, role} = req.body
    let encrypt = bcrypt.genSaltSync(10)
    User.create({username, password: encrypt, role})
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      // ---------------
    })
  }
  static profile(req, res){
    Profile.findOne({where: {id}})
    res.render('')
  }
}


module.exports = Controller