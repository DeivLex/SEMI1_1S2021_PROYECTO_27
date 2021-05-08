import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {server} from '../../params'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  post(name,price,qty,description,extension,base64){
    const path = `${server}/product/`;
    return this.http.post<any>(path,{
      name:name,
      price:price,
      qty:qty,
      description:description,
      extension:extension,
      base64:base64
    });
  }
  traducir(texto){
    const path = `${server}/translate/`;
    return this.http.post<any>(path,{
      text:texto,
    });
  }
  getAll(){
    const path = `${server}/product/`;
    return this.http.get<any>(path);
  }
}
