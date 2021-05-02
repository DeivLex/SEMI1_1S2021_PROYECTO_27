import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  datos = [];
  total = 0;
  constructor( private serviceCart: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.datos = [];
    this.total = 0;
    const id = localStorage.getItem('user');
    this.serviceCart.getOne(id).subscribe( data => {
      this.datos = data.datos;
      this.datos.forEach( element => {
        this.total += Number(element.subtotal);
      });
    });
  }

  // tslint:disable-next-line:typedef
  Remove(index, sub){
    this.total -= Number(sub);
    this.datos.splice(index, 1);
  }
  // tslint:disable-next-line:typedef
  Comprar(){
    const id = localStorage.getItem('user');
    this.serviceCart.deleteOne(id).subscribe( data => {
    });
    this.datos = [];
    this.total = 0;
    alert('Se le envio un correo con la informacion de la compra');
    this.toastr.success('Compra Realizada Correctamente');
  }

}
