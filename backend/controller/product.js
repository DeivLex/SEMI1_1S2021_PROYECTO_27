const productDb = require('../database/product')
const s3 = require('../services/s3')
const rekog = require('../services/rekognition')

module.exports.post = async function(req,res){
    let upload =  s3.upload(req.body.base64,req.body.extension)
    upload.then((data) => {
        req.body.image = data.Location
        let recon = rekog.getLabels(req.body.base64);
        recon.then((data) => {
            productDb.post(req,res,data.Labels);
        }).catch(err => {
            res.status(400).send({msg:err.message})
        })
    }).catch(err => {
        res.status(400).send({msg:err.message})
    })
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