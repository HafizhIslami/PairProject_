const {Post, Profile, Tag, User} = require('../models')
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    res.redirect('/user/login')
  }
  static loginForm(req, res){
    res.render('login')
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
  static createAccountForm(req,res){
    res.render('register')
  }
  static createAccount(req,res){
    const {username, password, role} = req.body
    let encrypt = bcrypt.genSaltSync(10)
    Profile.create({})
    .then(result => {
      const {id} = result
      return User.create({
        username, 
        password: encrypt, 
        role, 
        ProfileId: +id
      })
    })
    .then(result1 => {
      res.redirect('/user/login')
    })
    .catch(err => { 
      res.send(err)
    })
  }
  static profile(req, res){
    Profile.findOne({where: {id}})
    .then(result => {
      res.render('', {result})
    })
    .catch(err => {
      // ---------------
    })
  }
  static editProfileForm(req, res){
    const {id} = req.params
    Profile.findByPk(+id)
    .then(result => {
      res.render('', {result})
    })
    .catch(err => {
      // ---------------
    })
  }
  static profileEdited(req, res){
    const {id} = req.params
    Profile.findByPk(+id)
    .then(result => {
      res.render('', {result})
    })
    .catch(err => {
      // ---------------
    })
  }
  static allVisitor(req, res){
    Post.findAll()
    .then(result => {
      res.render('', {result})
    })
    .catch(err => {
      // ---------------
    })
  }
  static storyForm(req, res){
    res.render('')
  }
  static postStory(req, res){
    const {title, content, imgUrl, tagId} = req.body
    const {id} = req.params
    Post.create({title, content, imgUrl, TagId: tagId, UserId: id})
    .then(result => {
      res.redirect('/user/profile')
    })
    .catch(err => {

    })
  }
}


module.exports = Controller