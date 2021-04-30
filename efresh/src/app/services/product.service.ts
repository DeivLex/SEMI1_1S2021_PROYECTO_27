import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {server} from '../../params'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }


  getAll(){
    const path = `${server}/product/`;
    return this.http.get<any>(path);
  }
}
