const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const credentials = require('../config/credentials')


const userPool = new AmazonCognitoIdentity.CognitoUserPool(credentials.AWS_SECRET.cognito)

module.exports.signup =(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const phoneNumber =req.body.phoneNumber
    const address =req.body.address
    const password = req.body.password;
    

    const emailAttr = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email
    });
    userPool.signUp(email, password, [emailAttr], null, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send({msg:err.message});
        }else{
            console.log(data.user);
            res.status(200).send(data.user);
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
            res.status(200).send(data);
        },
        onFailure: err =>{
            res.status(400).send(err.message);
        }
    })
}