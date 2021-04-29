const productDb = require('../database/product')
const s3 = require('../services/s3')

module.exports.post = async function(req,res){
    let upload = await s3.upload(base64,extension)
    if(upload.status){
        req.body.image = upload.msg
        productDb.post(req,res);
    }else{
        res.status(400).send(upload.msg)
    }
}

module.exports.getAll = async function(req,res){
    productDb.getAll(req,res);
}

module.exports.get = async function(req,res){
    productDb.get(req,res);
}
 
module.exports.put = async function(req,res){
    productDb.put(req,res);
}

module.exports.delete = async function(req,res){
    productDb.delete(req,res);
}