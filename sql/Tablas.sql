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
	existencia int
)




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


drop table usuario;


select * from usuario


