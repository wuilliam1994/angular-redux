import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TakeOrdersService {

  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getMenu(idHouse: string, idTable: string) {

    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${idTable}`;
    
    return this.http.get(url, { 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );

  }
}
