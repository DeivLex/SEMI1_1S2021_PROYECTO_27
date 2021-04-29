var AWS = require('aws-sdk');
var uuid = require('uuid').v4;
const credentials = require('../config/credentials')

const s3 = new AWS.S3(credentials.s3);

module.exports.upload = async (base64img,extension)=>{
    let encodedImage = base64img;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    let filename = `${uuid()}.${extension}`; //uuid() genera un id unico para el archivo en s3
    let folder = 'fotos/';
    let filepath = `${folder}${filename}`;
    var uploadParamsS3 = {
        Bucket: credentials.bucketname,
        Key: filepath,
        Body: decodedImage,
    };
    await new Promise(s3.upload(uploadParamsS3, function sync(err, data) {
            if (err) {
                reject({msg:'error en s3',status:true})
            } else {
                resolve({msg:data.Location,status:false})
            }
        })
    ).then(r=>{return r})
    .catch(r=>{return r});

    
}