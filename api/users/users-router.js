const router = require('express').Router();
const Users = require('./users');

router.get('/', (req, res, next) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
})

module.exports = router;