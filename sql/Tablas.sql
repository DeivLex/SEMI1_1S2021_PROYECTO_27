use semi1;
create table usuario(
	idUsuario int IDENTITY(1,1) NOT NULL primary key,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	fechaRegistro date NOT NULL,
	direccion varchar(50) NOT NULL,
	telefono varchar(30) NOT NULL,
	correo varchar(50) NOT NULL
);


CREATE TABLE producto(
	idProducto int IDENTITY(1,1) NOT NULL primary key,
	nombre varchar(50) NOT NULL,
	precio float,
	existencia int,
	imagen varchar(300),
	descripcion varchar(300)
)



insert into producto(nombre,precio,existencia,imagen,descripcion)
OUTPUT INSERTED.idProducto
values('manzana roja',33.5,500,'no tiene imagen','es una manzana roja')

select * from producto;

create table categoria(
	idCategoria int IDENTITY(1,1) NOT NULL primary key,
	nombre varchar(70)
)


create table categoriaDetalle(
	idCategoriaDetalle int not null,
	idProductoDetalle int not null,
	foreign key(idCategoriaDetalle) references categoria(idCategoria),
	foreign key(idProductoDetalle) references Producto(idProducto)
)

create table carrito(
	idCarrito int IDENTITY(1,1) NOT NULL primary key,
	idUsuarioDetalle int not null,
	active varchar(50) NOT NULL,
	foreign key(idUsuarioDetalle) references usuario(idUsuario)
);

create table carritoDetalle(
	idCarritoDetalle int not null,
	idProductoDetalle int not null,
	cantidad int not null,
	subtotal int not null,
	foreign key(idProductoDetalle) references Producto(idProducto),
	foreign key(idCarritoDetalle) references carrito(idCarrito)
);


select * from categoria;


------------------CREAR LA CATEOGIRA DEL PRODUCTO
CREATE OR ALTER PROCEDURE crearProducto @idProd int, @cateIn nvarchar(70)
AS
DECLARE @idCate Int
IF EXISTS (SELECT * FROM categoria WHERE nombre = @cateIn)
BEGIN
	
	SET @idCate = (select idCategoria from categoria where nombre = @cateIn)
	insert into categoriaDetalle values(@idCate,@idProd)
END
ELSE
BEGIN
   	insert into categoria(nombre) values(@cateIn);
   	SET @idCate = (select idCategoria from categoria where nombre = @cateIn)
	insert into categoriaDetalle values(@idCate,@idProd)
END;

EXEC crearProducto @idProd = 1,@cateIn = 'NOVO';
----------------------BORRAR PRODUCTO Y SUS CATEOGRIAS
CREATE OR ALTER PROCEDURE eliminarProducto @idProd int
AS
BEGIN
	delete from categoriaDetalle   where idProductoDetalle = @idProd
	delete from producto   where idProducto = @idProd
END;

EXEC eliminarProducto @idProd = 19;
----------------------CATEGORIAS DE UN PRODUCTO
CREATE OR ALTER PROCEDURE verCategoriaProducto @idProd int
AS
BEGIN
	select c.nombre from categoriaDetalle cd 
	inner join producto p 
	on p.idProducto = cd.idProductoDetalle 
	inner join categoria c 
	on c.idCategoria  = cd.idCategoriaDetalle 
	where p.idProducto  = @idProd
END;

EXEC verCategoriaProducto @idProd = 18;
--------------------------------
select * from categoriaDetalle cd 

select * from categoria c 


select * from producto p 

drop table usuario;


select * from usuario


