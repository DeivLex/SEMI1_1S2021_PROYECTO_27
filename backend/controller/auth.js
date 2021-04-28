const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const credentials = require('../config/credentials')
const authDb = require('../database/auth')

const userPool = new AmazonCognitoIdentity.CognitoUserPool(credentials.AWS_SECRET.cognito)

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