import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Account, IKitchen } from '../../interfaces/kitchen.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumedService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  addConsumed(idHouse: string, idTable: string, idAccount: string, body: any) {
    // "/:house/:table/:account/consumed/insert"
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${idTable}/${idAccount}/consumed/insert`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.post<any>(url, body, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  getConsumedPending(idHouse: string) {
    // /:house/account/pending
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/account/pending`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<IKitchen>(url, { 
      headers,
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  setConsumedReady(account: Account, idHouse: string, idConsumeds: string[]) {
    // /:house/:table/:account/consmed/ready/:id"
    const token = this.cookieService.get('token');
    
    const url = `${this.baseUrl}/${idHouse}/${account.table._id}/${account._id}/consmed/ready`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    const body = {
      "product": idConsumeds
    }

    return this.http.put<IKitchen>(url, body, { 
      headers,
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp),
    );
  } 


  getAccountReady(idHouse: string) {
    // /:house/account/pending
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/account/ready`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<IKitchen>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }

  setAccountInTable(account: Account, idHouse: string, idAccounts: string[]) {
    // /:house/:table/:account/consmed/ready/:id"
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/${account.table._id}/${account._id}/consmed/intable`;
    
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    const body = {
      "product": idAccounts
    }

    return this.http.put<IKitchen>(url, body, { 
      headers,
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp),
    );
  }
}
