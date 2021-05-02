import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showFiller = false;
  showLogin = true;
  constructor(private userS: UserService,private router: Router) { }
  store(){
    console.log("hola")
  }
  ngOnInit(): void {
    this.userS.isLoggedCambio.subscribe(value => {this.showLogin = value; console.log(value)});
    this.userS.comprobarLogin();
    
  }
  logout(): void{
    this.userS.deleteLogin();
    this.router.navigate(['/']);
  }
  

}
