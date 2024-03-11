import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
// import { ITable, Table } from '../../interfaces/table.interface';
import { Category, ICategory } from "../../interfaces/category.interface";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listCategories(idHouse: string){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/category/list`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<ICategory>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  addCategory(category: any, idHouse: string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${idHouse}/category/insert`;

    const body = {
      name: category['name'],
      description: category['description'],
    }
    return this.http.post<ICategory>(url, body, { 
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


  editCategory(category: Category){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${category.house}/category/edit/${category._id}`;

    const body = {
     name: category.name,
     description: category.description
    }
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.put<ICategory>(url, body, { 
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


  deleteCategory(category: Category){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${category.house}/category/delete/${category._id}`;
    return this.http.delete<ICategory>(url, { 
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
