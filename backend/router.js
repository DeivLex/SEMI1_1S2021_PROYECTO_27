const express = require('express');
const router = express.Router();
const auth = require('./controller/auth')
const user = require('./controller/user')
const middle = require('./middleware/auth')

//=================AUTENTICACION COGNITO==============
//CREAR CUENTA
router.post('/signup',middle.signup(),(req, res)=>{auth.signup(req, res)})
//INICIAR SESION
router.post('/login',(req, res)=>{auth.login(req, res)})
//=================OPREACIONES DE USUARIO ==============
//INFO DE UN USUARIO
router.get('/user/:id',(req, res)=>{user.get(req, res)})
//ACTUALIZAR USUARIO
router.put('/user/:id',(req, res)=>{user.put(req, res)})
//ELIMINAR USUARIO
router.delete('/user/:id',(req, res)=>{user.delete(req, res)})
//INFO DE TODOS LOS USUARIOS
router.get('/user/',(req, res)=>{user.getAll(req, res)})



module.exports = router