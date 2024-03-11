import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ITable, Table } from '../../interfaces/table.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listTables(idHouse: string){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/table/list`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<ITable>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  addTable(table: any, idHouse: string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${idHouse}/table/insert`;

    const body = {
      number: parseInt(table['number']),
    }
    return this.http.post<ITable>(url, body, { 
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


  editTable(table: Table){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${table.house}/table/edit/${table._id}`;

    const body = {
      number: table.number,
      inUse: false
    }
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.put<ITable>(url, body, { 
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


  deleteTable(table: Table){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${table.house}/table/delete/${table._id}`;
    return this.http.delete<ITable>(url, { 
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
