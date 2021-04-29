const express = require('express');
const router = express.Router();
const auth = require('./controller/auth')
const user = require('./controller/user')
const product = require('./controller/product')
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
//=================OPREACIONES DE PRODUCTO ==============
//INFO DE UN PRODUCTO
router.get('/product/:id',(req, res)=>{product.get(req, res)})
//ACTUALIZAR PRODUCTO
router.put('/product/:id',(req, res)=>{product.put(req, res)})
//ELIMINAR PRODUCTO
router.delete('/product/:id',(req, res)=>{product.delete(req, res)})
//INFO DE TODOS LOS PRODUCTOS
router.get('/product/',(req, res)=>{product.getAll(req, res)})
//CREAR PRODUCTO
router.post('/product/',(req, res)=>{product.post(req, res)})

module.exports = router