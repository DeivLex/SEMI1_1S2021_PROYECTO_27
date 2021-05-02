const mssql = require("mssql");
const config = require('../config/config');


module.exports.getAll = function (req,res){
        mssql.connect(config.configdb, function (err) {
        var request = new mssql.Request();
        request.query('select * from categoria;',
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
    request.query(`EXEC verCategoriaProducto @idProd = ${id};`,
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
