const mssql = require("mssql");
const config = require('../config/config');
module.exports.getAll = function (req,res){
        mssql.connect(config.configdb, function (err) {
        var request = new mssql.Request();
        request.query('select * from usuario',
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


module.exports.get = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    request.query(`select * from usuario where idUsuario = ${id};`,
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

module.exports.put = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    const name = req.body.name;
    const lastname = req.body.name;
    const phoneNumber =req.body.phoneNumber
    const address =req.body.address
    request.query(`
        update  usuario 
        set nombre = '${name}',apellido = '${lastname}',
        direccion = '${address}',telefono = '${phoneNumber}'
        where idUsuario = ${id};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                if(records.rowsAffected[0]==0)
                    res.status(400).send({msg:"No se encontro el usuario para actualizar"})
                else
                    res.status(200).send(records)
            }

        });
})
}

module.exports.delete = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    request.query(`delete from usuario where idUsuario = ${id};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                if(records.rowsAffected[0]==0)
                    res.status(400).send({msg:"No se encontro el usuario para eliminar"})
                else
                    res.status(200).send(records)
            }

        });
})
}
