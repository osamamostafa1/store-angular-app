import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(limit: any) {
    return this.http.get<any>(environment.baseUrl + `products?limit=${limit}`);
  }
  getProductsByCategory(selectdCategory: any) {
    return this.http.get<any>(environment.baseUrl + `products/category/${selectdCategory}`);
  }

  getProductById(id: any) {
    return this.http.get<any>(environment.baseUrl + `products/${id}`);
  }

  addProduct(data: any) {
    return this.http.post<any>(environment.baseUrl + `products`, data);
  }

  editProduct(data: any, id: any) {
    return this.http.put<any>(environment.baseUrl + `products/${id}`, data);
  }

  deleteProduct(id: any) {
    return this.http.delete<any>(environment.baseUrl + `products/${id}`);
  }
}
