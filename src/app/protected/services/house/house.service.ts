import { Injectable } from '@angular/core';
import { House, IHouse } from '../../interfaces/house.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { IWorker, Worker } from '../../interfaces/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listHouses(){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/house/list`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<IHouse>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }


  editHouse(house: House){

    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/house/edit/${house._id}`;

    const body = {
      name: house.name,
      cantTables: house.cantTables
    }
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.put<IHouse>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {

        // return resp;
      })      
    );
  }


  deleteHouse(house: House){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/house/delete/${house._id}`;

    return this.http.delete<IHouse>(url, { 
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

  addHouse(house: any){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/house/insert`;

    const body = {
      name: house.name,
      cantTables: house.cantTables
    }
    return this.http.post<IHouse>(url, body, { 
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

  getHouseUser() {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/house/worker`;
    
    return this.http.get<any>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => {
        return resp.body?.data;
      })      
    );
  }
}
