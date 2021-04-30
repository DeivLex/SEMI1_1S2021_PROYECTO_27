const cartDb = require('../database/cart')

module.exports.getAll = async function(req,res){
    await cartDb.getAll(req,res);
}

module.exports.post = async function(req,res){
    await cartDb.post(req,res);
}

module.exports.delete = async function(req,res){
    await cartDb.delete(req,res);
}

module.exports.get = async function(req,res){
    await cartDb.get(req,res);
}