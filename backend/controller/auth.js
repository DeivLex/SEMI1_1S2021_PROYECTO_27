const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const credentials = require('../config/credentials')
const authDb = require('../database/auth')
var AWS = require('aws-sdk');

const userPool = new AmazonCognitoIdentity.CognitoUserPool(credentials.AWS_SECRET.cognito)
const ses = new AWS.SES(credentials.AWS_SECRET.ses)

module.exports.signup = async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const emailAttr = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email
    });

    await userPool.signUp(email, password, [emailAttr], null, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send({msg:err.message});
        }else{
            //console.log(data.user);
            authDb.signup(req,res);
        }
    })

    
    
}


module.exports.login = (req,res)=>{
    const loginDetails = {
        Username: req.body.email,
        Password: req.body.password
    }
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails)
    const userDetails = {
        Username:req.body.email,
        Pool:userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails)
    cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess:data=>{
            authDb.login(req,res);
        },
        onFailure: err =>{
            res.status(400).send({msg:err.message});
        }
    })
}

module.exports.sendEmailCompra = (req,res)=>{
    var MessageR = req.body.Message;
    var EmailR = req.body.Email;
    var params = {
        Destination: { /* required */
        ToAddresses: [
            EmailR,
            /* more items */
        ]
        },
        Message: { /* required */
        Body: { /* required */
            Html: {
            Charset: "UTF-8",
            Data: MessageR
            },
            Text: {
            Charset: "UTF-8",
            Data: MessageR
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Compra eFresh'
        }
        },
        Source: '2938836290101@ingenieria.usac.edu.gt', /* required */
    };
    ses.sendEmail(params, function(err, data) {
        if (err) {
        res.json({mensaje: err})
        } else {   
        res.json({texto: data});      
        }
    });
}