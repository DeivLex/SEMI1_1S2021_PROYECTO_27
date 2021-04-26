module.exports.signup =()=>{
    return (req, res, next) => {
        if(req.body.password!==req.body.confirmPassword)
            res.status(400).send({msg:"La contrasenia de confirmar debe ser la misma "})
        else{
            next()
        }
    }
}