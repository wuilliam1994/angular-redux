import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environments';
import { ITable, Table } from '../../interfaces/table.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listTables(){
    
  }


  editTable(table: Table){

   
  }


  deleteTable(house: Table){

  }
}
