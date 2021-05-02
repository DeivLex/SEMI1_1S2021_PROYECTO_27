const mssql = require("mssql");
const config = require('../config/config');



module.exports.post = function (req,res,labels){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    const name = req.body.name;
    const price = req.body.price;
    const qty = req.body.qty;
    const descripcion = req.body.description;
    const image = req.body.image;
    request.query(`
        insert into  producto (nombre,precio,existencia,imagen,descripcion)
        OUTPUT INSERTED.idProducto
        values('${name}','${price}','${qty}','${image}','${descripcion}');`,
        async function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                let idProducto = records.recordset[0].idProducto
                let errorP = undefined;
                await Promise.all(labels.map(async (cateItem) => {
                    var requestCate = new mssql.Request();
                    requestCate.query(`
                    EXEC crearProducto @idProd = ${idProducto},
                        @cateIn = '${cateItem.Name}';`,
                    function (err, records) {
                        if(err)
                            errorP=err
            
                    });
                }));
                if(errorP)
                    res.status(400).send({msg:errorP,U:2})
                else
                    res.status(200).send(records.recordset[0])
            }

        });
})
}

module.exports.getAll = function (req,res){
        mssql.connect(config.configdb, function (err) {
        var request = new mssql.Request();
        request.query('select * from producto',
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
    request.query(`select * from producto where idProducto = ${id};`,
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
    const price = req.body.price;
    const qty = req.body.qty;
    const descripcion = req.body.description;
    const image = req.body.image;
    let queryImage = ""
    if(image != undefined){
        queryImage = `,imagen = '${image}'`
    }
    request.query(`
        update  usuario 
        set nombre = '${name}',precio = '${price}',
        existencia = '${qty}',descripcion = '${descripcion}' ${queryImage}
        where idProducto = ${id};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                if(records.rowsAffected[0]==0)
                    res.status(400).send({msg:"No se encontro el producto para actualizar"})
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
    request.query(`EXEC eliminarProducto @idProd = ${id};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                if(records.rowsAffected[0]==0)
                    res.status(400).send({msg:"No se encontro el producto para eliminar"})
                else
                    res.status(200).send(records)
            }

        });
})
}
