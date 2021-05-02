var AWS = require('aws-sdk');
const credentials = require('../config/credentials')
const rek = new AWS.Rekognition(credentials.AWS_SECRET.rekogniton);

module.exports.getLabels = async (img64)=>{
    let decodedImage = Buffer.from(img64, 'base64');
    const params = {Image:{'Bytes':decodedImage},MaxLabels:10}
    return rek.detectLabels(params).promise()
}