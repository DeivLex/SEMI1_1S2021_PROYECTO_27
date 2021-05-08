var AWS = require('aws-sdk');
const credentials = require('../config/credentials')
const translate = new AWS.Translate(credentials.AWS_SECRET.s3);


module.exports.textTrans =  async function(req,res)  {
    var params = {
        SourceLanguageCode: 'auto',
        TargetLanguageCode: 'en',
        Text: req.body.text
      };
      translate.translateText(params, function (err, data) {
        if (err) res.send({ text : 'ddb failed'});
        else{
            res.send({ text : data.TranslatedText});
        }
      });
}