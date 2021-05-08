import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  pList = [];
  constructor(public dialog: MatDialog,private fetchProduct: ProductService, private serviceCart: CartService, private toastr: ToastrService) {
    this.fetchProduct.getAll().subscribe( data => {
      data.recordset.forEach(element => {
        element.value = 1;
        this.pList.push(element);
      });
      console.log(data.recordset);
    }, (err => {
      this.pList = [];
      console.log(err);
    })
  );

  }

  tradu(texto) {
    this.fetchProduct.traducir(texto).subscribe( data => {
      this.toastr.success(data.text,"TEXTO TRADUCIDO");
    }, (err => {
      this.toastr.warning('ERROR',"ERROR TEXTO TRADUCIDO");
    })
    )

    
  }

  ngOnInit(): void {
  }
  agregarCarrito(producto, cantidad): void{
    const id = localStorage.getItem('user');
    const product = producto.idProducto;
    const sub = Number(producto.precio) * Number(cantidad);
    console.log(producto , cantidad);
    this.serviceCart.InsertCart(id, product, cantidad, String(sub)).subscribe( data => {
      console.log(data);
      this.toastr.info('Se agrego al carrito');
    }, (err => {
      console.log(err);
    })
  );
  }
}
