import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {server} from '../../params';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  InsertCart(idR: string, productR: string, countR: string, subtotalR: string){
    const path = `${server}/cart/`;
    return this.http.post<any>(path, {
      id: idR,
      product: productR,
      count: countR,
      subtotal: subtotalR
    });
  }
  // tslint:disable-next-line:typedef
  InsertCompra(idR: string, fechaR: string, productR: string, totalR: string){
    const path = `${server}/compra/`;
    return this.http.post<any>(path, {
      id: idR,
      fecha: fechaR,
      product: productR,
      total: totalR
    });
  }
  // tslint:disable-next-line:typedef
  getOne(idR: string){
    const path = `${server}/cart/${idR}`;
    return this.http.get<any>(path);
  }
  // tslint:disable-next-line:typedef
  getOneCompra(idR: string){
    const path = `${server}/compra/${idR}`;
    return this.http.get<any>(path);
  }
  // tslint:disable-next-line:typedef
  deleteOne(idR: string){
    const path = `${server}/cart/${idR}`;
    return this.http.delete<any>(path);
  }
  // tslint:disable-next-line:typedef
  EmailCompra(emailR: string, mensajeR: string){
    const path = `${server}/compraEmail/`;
    return this.http.post<any>(path, {
      Email: emailR,
      Message: mensajeR
    });
  }
}
