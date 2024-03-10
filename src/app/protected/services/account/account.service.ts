import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { IAccount } from '../../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createAccount(idHouse: string, idTable: string) {

    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${idTable}/account/insert`;
    
    return this.http.post<IAccount>(url, { 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.data),
    );

  }
}
