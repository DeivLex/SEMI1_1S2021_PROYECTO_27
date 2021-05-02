import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {server} from '../../params'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged:boolean = false;
  isLoggedCambio: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: HttpClient) {
    this.isLoggedCambio.subscribe((value) => {
      this.isLogged = value
    });
  }

  comprobarLogin(){
    if(localStorage.getItem('user')=="")
      this.isLoggedCambio.next(true);
    else
      this.isLoggedCambio.next(false);

      return this.isLogged
  }

  saveLogin(user){
    localStorage.setItem('user', user.idUsuario);
    localStorage.setItem('userJson', JSON.stringify(user));
    this.isLoggedCambio.next(false);
  }
  getLogin(){
    return  JSON.parse(localStorage.getItem('userJson') || '{idUsuario:-1}');
  }
  deleteLogin(){
    localStorage.setItem('user', "");
    localStorage.setItem('userJson', "{}");
    this.isLoggedCambio.next(true);
  }
  login(emailInput,passwordInput){
    const path = `${server}/login/`;
    return this.http.post<any>(path,{email:emailInput,password:passwordInput});
  }

  register(email,password,confirmPassword,phoneNumber,address,name,lastname){
    const path = `${server}/signUp/`;
    return this.http.post<any>(path,{
      email:email,
      password:password,
      confirmPassword:confirmPassword,
      phoneNumber:phoneNumber,
      address:address,
      name:name,
      lastname:lastname,
    });
  }
}
