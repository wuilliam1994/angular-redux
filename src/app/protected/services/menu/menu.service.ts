import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { IMenu, Menu } from '../../interfaces/menu.interface';
import { IUpload } from '../../interfaces/upload.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl: string = environment.baseURL;
  private token = this.cookieService.get('token')
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listMenus(idHouse: string, idCategory: string){
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/list`;
    
    const headers = new HttpHeaders({
      'token': `${this.token}`
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
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/insert`;

    const body = {
      product: menu['product'],
      price: parseInt(menu['price']),
      cantidad: parseInt(menu['cantidad']),
      photo: menu['photo'],
    }
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
    
    const url = `${this.baseUrl}/${idHouse}/${idCategory}/menu/edit/${menu._id}`;

    const body = {
      product: menu.product,
      price: menu.price,
      cantidad: menu.cantidad,
      photo: menu.photo,
    }
    
    const headers = new HttpHeaders({
      'token': `${this.token}`
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

  uploadImg(image: File, idHouse: string) {
    const url = `${this.baseUrl}/${idHouse}/upload`;
    const body = new FormData();
    body.append('image', image);
    
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });

    return this.http.post<IUpload>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {
        return resp.body;
      })      
    );
  }


  deleteImgUp(image: string, idHouse: string) {
    const url = `${this.baseUrl}/${idHouse}/upload/delete`;
    const pointP = image.indexOf('.');
    const body = {
      fileName:image.substring(0, pointP), 
      fileExt: image.substring(pointP + 1, image.length)
    }
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });

    return this.http.delete(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
      body
     })
    .pipe(
      map(resp => {
        return resp.body;
      })      
    );
  }


  deleteMenu(menu: Menu, idHouse: string, idCategory: string){
    const headers = new HttpHeaders({
      'token': `${this.token}`
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
