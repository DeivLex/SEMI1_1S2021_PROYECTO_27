const mssql = require("mssql");
const config = require('../config/config');

module.exports.getAll = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    request.query('select * from carrito',
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

module.exports.post = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    const id = req.body.id;
    const product = req.body.product;
    const count = req.body.count;
    const subtotal = req.body.subtotal;
    request.query(`
    SELECT * from carrito
    WHERE idUsuarioDetalle = ${id};`,
    function (err, records) {
        if (err){ 
            res.status(400).send({msg:err})
        }
        else{
            if(records.rowsAffected == 0){
                request.query(`INSERT INTO carrito VALUES (${id}, '1');`);
                var idCarrito = 0;
                request.query(`SELECT idCarrito FROM carrito 
                WHERE idUsuarioDetalle = ${id};`,
                function (err, records1) {               
                    idCarrito = records1.recordset[0].idCarrito;
                    request.query(`INSERT INTO carritoDetalle VALUES ( ${idCarrito} , ${product} , ${count} , ${subtotal});`,
                    res.status(200).send(records)
                );
                });
            }else if(records.recordset[0].active == 1){
                var idCarrito = 0;
                request.query(`SELECT idCarrito FROM carrito 
                WHERE idUsuarioDetalle = ${id};`, 
                function (err, records1) {               
                    idCarrito = records1.recordset[0].idCarrito;
                    request.query(`INSERT INTO carritoDetalle VALUES ( ${idCarrito} , ${product} , ${count} , ${subtotal});`,
                    res.status(200).send(records)
                );
            });
            }
        }

    });
})
}

module.exports.delete = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    var idCarrito = 0;
    request.query(`SELECT idCarrito FROM carrito 
    WHERE idUsuarioDetalle = ${id};`,  
    function (err, records1) {               
    idCarrito = records1.recordset[0].idCarrito;
    request.query(`delete from carritoDetalle where idCarritoDetalle = ${idCarrito};`,
    function (err, records) {
        if (err){ 
            res.status(400).send({msg:err})
        }
        else{
            if(records.rowsAffected[0]==0)
                res.status(400).send({msg:"No se encontro el carrito para eliminar"})
            else
                res.status(200).send(records)
        }

    });
    }
    );
})
}


module.exports.get = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    var idCarrito = 0;
    request.query(`SELECT idCarrito FROM carrito 
    WHERE idUsuarioDetalle = ${id};`,  
    function (err, records1) {               
    idCarrito = records1.recordset[0].idCarrito;
    request.query(`select * from carritoDetalle as c,producto as  p 
    where c.idProductoDetalle = p.idProducto
    and idCarritoDetalle = ${idCarrito};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                res.status(200).send({datos: records.recordset})
            }

        });
    }
    );
})
}

module.exports.postCompra = function (req,res){
    mssql.connect(config.configdb, function (err) {
        var request = new mssql.Request();
        const id = req.body.id;
        const fecha = req.body.fecha;
        const product = req.body.product;
        const total = req.body.total;
        request.query(`INSERT INTO compra VALUES ( ${id} , '${fecha}' , '${product}' , ${total})`,
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


module.exports.getCompra = function (req,res){
    mssql.connect(config.configdb, function (err) {
    var request = new mssql.Request();
    var id = req.params.id;
    request.query(`select * from compra WHERE  idUsuarioDetalle = ${id};`,
        function (err, records) {
            if (err){ 
                res.status(400).send({msg:err})
            }
            else{
                res.status(200).send({datos: records.recordset})
            }

        });
    });
}