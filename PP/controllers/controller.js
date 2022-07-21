const { Post, Profile, Tag, User } = require('../models')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    res.redirect('/login')
  }

  static loginForm(req, res){
    req.session.id = 999;
    const { error } = req.query
    res.render('login', { error })
  }

  static login(req, res){
    const { username, password } = req.body
    User.findOne({
      where: {
        username
      },
      attributes: ['id', 'username', 'password']
    })
    .then(result => {
      if (result) {
        const isPassTrue = bcrypt.compareSync(password, result.password);//--------
        console.log(password, isPassTrue, "<======dari compare")
        if (isPassTrue) {
          res.redirect('/posts/' + result.id);
          return;
        }
      }
      res.redirect('/login?error=Wrong username or password');
    })
    .catch(err => {
      res.send(err);
    })
  }

  static createAccountForm(req,res){
    const { error } = req.query
    res.render('register', { error })
  }

  static createAccount(req,res){
    const {username, password, role} = req.body
    User.newUser(username, password, role)
    .then(result => {
      const { id } = result
      Profile.create({
        UserId: id
      })
      res.redirect('/login')
    })
    .catch(err => { 
      console.log(err);
      // if (err.name = "SequelizeValidationError") {
      //   err = err.errors.map(el => el.message)
      //   res.redirect('/createaccount?error=' + err)
      //   return;
      // }
      res.send(err)
    })
  }

  static profile(req, res){
    const id = req.params.id
    Profile.findOne({where: {id: +id}}) 
    .then(result => {
      return Post.findAll({where: {UserId: +id}}), result
    })
    .then(result1 => {
      const {} = result1  // cek pilihan data untuk dilempar ke render
      res.render('index', { result, page: 'profile'})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editProfileForm(req, res){
    const {id} = req.params
    Profile.findByPk(+id)
    .then(result => {
      res.render('index', { result, page: 'profileEdit' })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static profileEdited(req, res){
    const {id} = req.params
    Profile.findByPk(+id)
    .then(result => {
      res.redirect('user/profile')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static posts(req, res){
    const search = req.query.search || ""
    Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      where: {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    })
    .then(result => {
      res.render('index', { result, page: 'posts' })
    })
    .catch(err => {
      res.send(err);
    })
  }

  static storyForm(req, res){
    Tag.findAll()
    .then(result => {
      res.render('index', { result, page: 'postAdd' })
    })
    .catch(err => {
      res.send(err);
    })
  }

  static postStory(req, res){
    const {title, content, imgUrl, TagId} = req.body
    const id = req.params.id
    Post.create({title, content, imgUrl, TagId, UserId: +id})
    .then(result => {
      res.redirect('/user/profile')
    })
    .catch(err => {
      res.send(err)
    })
  }
}


module.exports = Controller