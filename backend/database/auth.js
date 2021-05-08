const mssql = require("mssql");
const config = require('../config/config');

module.exports.signup = function (req,res){
        mssql.connect(config.configdb, function (err) {
        // Create Request object to preform
        // query operation
        var request = new mssql.Request();
        const email = req.body.email;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const phoneNumber =req.body.phoneNumber
        const address =req.body.address
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        const dateN = mm + '/' + dd + '/' + yyyy;
        // Query to the database and get the records
        request.query(`insert into usuario(
                nombre,apellido,fechaRegistro,direccion,telefono,correo
            ) values(
            '${name}','${lastname}','${dateN}','${address}','${phoneNumber}','${email}'
            )`,
            function (err, records) {
                if (err){ 
                    res.status(400).send({msg:err})
                }
                else{
                    res.status(200).send(records)
                }

            });
    })
}

module.exports.login = async function (req,res){
    mssql.connect(config.configdb, function (err) {
    // Create Request object to preform
    // query operation
    var request = new mssql.Request();
    const email = req.body.email;    
    // Query to the database and get the records
    request.query(`select * from usuario where correo = '${email}';`,
    function (err, records) {
        if (err){ 
            res.status(400).send({msg:err})
        }
        else{
            res.status(200).send(records)
        }

    });
});
}