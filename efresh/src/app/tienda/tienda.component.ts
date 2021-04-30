import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  pList = []
  constructor(private fetchProduct:ProductService) { 
    this.fetchProduct.getAll().subscribe( data => {
      this.pList=data.recordset
      console.log(data.recordset)
    },(err=>{
      this.pList = []
      console.log(err)
    })
  );

  }

  ngOnInit(): void {
  }
  agregarCarrito(producto):void{
    console.log(producto)
    /*
      console.log("Agregar Carrito")
    */
  }
}
