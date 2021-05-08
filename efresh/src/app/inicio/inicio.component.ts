import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  usuario = {
    idUsuario :-1,
    correo:"3006050720101@ingenieria.usac.edu.gt",
    telefono:"78953646",
    direccion:"casa vieja",
    nombre:"juan",
    apellido:"perez",
    Armin:false
  }


  constructor(private toastr: ToastrService,private userS: UserService,private router: Router) { }

  ngOnInit(): void {
    this.userS.comprobarLogin();
    if(this.userS.isLogged == true)
      this.router.navigate(['/login']);
    this.usuario = this.userS.getLogin()  
    if(this.usuario.Armin == true)
      this.router.navigate(['/admin']);
    console.log(this.usuario)
  }

}
