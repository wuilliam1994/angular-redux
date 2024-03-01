import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environments';
import { map } from 'rxjs';
import { IMenu, Menu } from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listMenus(idHouse: string, idCategory: string){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/list`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<IMenu>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  addMenu(menu: any, idHouse: string, idCategory: string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/insert`;

    const body = {
      product: menu['product'],
      price: parseInt(menu['price']),
      cantidad: parseInt(menu['cantidad']),
      extension: menu['extension'],
      photo: menu['photo'],
    }
    console.log(body);
    
    return this.http.post<IMenu>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {
        return resp;
      })      
    );
  }


  editMenu(menu: Menu, idHouse: string, idCategory: string){
    console.log(menu);
    
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/edit/${menu._id}`;

    const body = {
      product: menu.product,
      price: menu.price,
      cantidad: menu.cantidad,
      photo: menu.photo,
    }
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.put<IMenu>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {
        return resp;
      })      
    );
   
  }


  deleteMenu(menu: Menu, idHouse: string, idCategory: string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/delete/${menu._id}`;
    return this.http.delete<IMenu>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {
        return resp;
      })      
    );
  }
}
