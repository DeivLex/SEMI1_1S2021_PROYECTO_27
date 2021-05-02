const tagDb = require('../database/tag')

module.exports.getAll = async function(req,res){
    await tagDb.getAll(req,res);
}

module.exports.get = async function(req,res){
    await tagDb.get(req,res);
}