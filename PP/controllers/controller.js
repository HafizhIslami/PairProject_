const { Post, Profile, Tag, User } = require('../models')
const { Op, Model, where } = require('sequelize');
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    res.redirect('/login')
  }

  static loginForm(req, res){
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
        const isPassTrue = bcrypt.compareSync(password, result.password);
        if (isPassTrue) {
          req.session.UserId = result.id
          res.redirect('/posts');
          return;
        }
      }
      res.redirect('/login?error=Wrong username or password');
    })
    .catch(err => {
      console.log(err)
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
      return Profile.create({
        UserId: +id
      })
    })
    .then(() => {
      res.redirect('/login')
    })
    .catch(err => { 
      if (err.name === "SequelizeValidationError") {
        err = err.errors.map(el => el.message)
        res.redirect('/createaccount?error=' + err)
        return;
      }
      res.send(err)
    })
  }

  static profile(req, res){
    const UserId = req.session.UserId
    let userData;
    User.findByPk(UserId,{
      include: [Profile],
      attributes: ['username']
    })
    .then(resultUser => {
      userData = resultUser.dataValues
      return Post.findAll({
        include: [Tag],
        where: {
          UserId
        }
      })
    })
    .then(postData => {
      res.render('index', { userData, postData, page: 'profile' });
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }

  static editProfileForm(req, res){
    const UserId = req.session.UserId
    Profile.findOne({
      where: {
        UserId
      }
    })
    .then(result => {
      res.render('index', { result, page: 'profileEdit' })
    })
    .catch(err => {
      res.send(err)
    })
  }
  
  static profileEdited(req, res){
    const data = req.body
    const UserId = req.session.UserId
    Profile.update(data, {
      where: {
        UserId
      }
    })
    .then(result => {
      res.redirect('/user/profile')
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
    const UserId = req.session.UserId
    Post.create({ title, content, imgUrl, TagId, UserId })
    .then(() => {
      res.redirect('/user/profile')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static tryEmoji(req, res){
    res.send()
  }
}


module.exports = Controller