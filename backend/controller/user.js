const userDb = require('../database/user')

module.exports.getAll = async function(req,res){
    console.log('paramsit00')
    await userDb.getAll(req,res);
}

module.exports.get = async function(req,res){
    console.log(req.params)
    console.log('paramsit')
    await userDb.get(req,res);
}
 
module.exports.put = async function(req,res){
    await userDb.put(req,res);
}

module.exports.delete = async function(req,res){
    await userDb.delete(req,res);
}