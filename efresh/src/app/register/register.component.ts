import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = ""
  password = ""
  confirmPassword = ""
  phoneNumber = ""
  address = ""
  name = ""
  lastname = ""

  constructor(private toastr: ToastrService,private userS: UserService,private router: Router) { }

  ngOnInit(): void {
  }
  register(){
    if(this.password !== this.confirmPassword){
      this.toastr.warning('Las contrasenias no son iguales');
      return
    }

    this.userS.register(
      this.email,this.password,this.confirmPassword,
      this.phoneNumber,this.address,this.name,this.lastname
    ).subscribe(
      (result) =>{
        this.toastr.success('Usuario Creado');
        this.router.navigate(['/']);},
      (err)=>{this.toastr.error(err.error.msg);} )
  }

}
