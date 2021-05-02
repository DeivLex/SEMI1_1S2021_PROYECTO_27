import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = "";
  email: string = "";
  constructor(private toastr: ToastrService,private userS: UserService,private router: Router) { }

  ngOnInit(): void {
    
  }
  loginIn(){
    if(this.password == "" || this.email == ""){
      this.toastr.warning('Formulario Incompleto');
      return
    }
      this.userS.login(this.email,this.password).subscribe(
        result => {
          let realUser = result.recordset[0]
          if(realUser == undefined){
            this.toastr.error('El Usuario No Existe En La Base De Datos');
            return
          }
          this.userS.saveLogin(realUser);
          this.toastr.success('Bienvenido');
          this.router.navigate(['/home']);
        },
        error=>{
          this.toastr.warning('Credenciales Incorrectas');
        })


  }

}
