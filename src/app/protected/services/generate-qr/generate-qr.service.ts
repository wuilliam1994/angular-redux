import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Qrgenerado } from '../../interfaces/qrgenerado.interface';

@Injectable({
  providedIn: 'root'
})
export class GenerateQrService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getGenerateQrOneTable(idHouse: string, tableSelected: string) {
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/qr`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    const body = {
      url: this.baseUrl,
      table: [tableSelected]
    }

    return this.http.post<Qrgenerado>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );

  }

  getGenerateQrManyTable(idHouse: string, arrayTable: string[]) {
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/qr`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    const body = {
      url: this.baseUrl,
      table: arrayTable
    }

    return this.http.post<Qrgenerado>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }
}
