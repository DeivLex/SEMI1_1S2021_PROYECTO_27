import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  items = [];
  constructor(private serviceCart: CartService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('user');
    this.serviceCart.getOneCompra(id).subscribe( data => {
      this.items = data.datos;
      this.items.forEach(element => {
        const splitted = String(element.productos).split(';');
        let final = '';
        splitted.forEach( valor => {
          final += valor + '\n';
        });
        console.log(final);
        element.productos = final;
      });
    });
  }

}
