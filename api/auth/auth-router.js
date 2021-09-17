const router = require('express').Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/model");
const tokenBuilder = require("../tokenBuilder");

const validateUsername = (req, res, next) => {
  const { username } = req.body;
  Users.findBy({ username })
    .then(([user]) => {
      if (user) {  next({status: 401,  message: "username taken" }) } 
      else { next();  }
    })
}
const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !username.trim() || !password || !password.trim()) {
    next({ status: 401,   message: "username and password required" })
  } 
  else {  next();}
}

const validateUsernameExists = (req, res, next) => {
  const { username } = req.body;
  Users.findBy({ username })
    .then(([user]) => {
      if (!user) { next({status: 401,   message: "invalid credentials"  })}
      else {
        req.user = user;
        next();
      }
    })
}

router.post('/register', validateUser, validateUsername, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.addUser({ username, password: hash })
    .then(newUser => {  res.status(201).json(newUser);  })
    .catch(next);
});

router.post('/login', validateUser, validateUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.status(200).json({ message: `Welcome, ${req.user.username}`, token })
  }
  else { next({ status: 401, message: "invalid credentials" }) }
});

module.exports = router;
