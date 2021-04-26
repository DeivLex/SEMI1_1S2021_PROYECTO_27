const express = require('express');
const router = express.Router();
const auth = require('./controller/auth')
const middle = require('./middleware/auth')

router.post('/signup',middle.signup(),(req, res)=>{
    auth.signup(req, res)
})

router.post('/login',middle.signup(),(req, res)=>{
    auth.login(req, res)
})

module.exports = router