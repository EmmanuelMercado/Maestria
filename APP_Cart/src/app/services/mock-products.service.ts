import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_API = "assets/data/products.json";

@Injectable({
  providedIn: 'root'
})
export class MockProductsService {

  
  constructor(private http: HttpClient) {}

    getProducts(){
      return this.http.get(`${URL_API}`);
    }

  
}
