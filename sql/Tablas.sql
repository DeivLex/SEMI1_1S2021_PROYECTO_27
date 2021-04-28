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


drop table usuario;


select * from usuario


