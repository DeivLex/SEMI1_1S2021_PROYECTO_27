import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  imgUrl = null
  extensionImg = null
  base64Img = null

  nombre = ""
  precio = ""
  cantidad = ""
  descripcion = ""

  constructor(private toastr: ToastrService, private produ: ProductService) { }

  ngOnInit(): void {
  }

  mandarProducto(){
    if(this.base64Img == null){
      this.toastr.warning('No Hay Imagen', 'Aviso!');
      return;
    }

    this.produ.post(this.nombre,this.precio,this.cantidad,this.descripcion,this.extensionImg,this.base64Img).subscribe( data => {
      console.log(data);
      this.toastr.info('Se agrego el producto');
    }, (err => {
      this.toastr.error(err,'Error');
      console.log(err);
    })
  )

    
  }

  preview(files){
    if (files.length === 0){
      this.toastr.error('No Hay Imagen Seleccionada', 'Error!');
      return;
    }
    this.toastr.info('Imagen Cargada', 'Aviso!');
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( _event ) => {
      this.imgUrl = reader.result;
      const re = new RegExp('/[a-zA-Z]+');
      const splitted = this.imgUrl.split(',');
      const extension = String(re.exec(splitted[0])[0]).substr(1);
      const ImagenBase64 = splitted[1];
      this.extensionImg = extension;
      this.base64Img = ImagenBase64;

    };
  }
}
