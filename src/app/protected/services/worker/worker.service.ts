import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { IUser, User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { IWorker } from '../../interfaces/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listWorkers(idHouse: string){
    const token = this.cookieService.get('token');
    const url = `${this.baseUrl}/${idHouse}/worker/list`;
    
    const headers = new HttpHeaders({
      'token': `${token}`
    });

    return this.http.get<IWorker>(url, { 
      headers, 
      observe: 'response', 
      responseType: 'json',
     })
    .pipe(
      map(resp => resp.body),
    );
  }


  addWorker(idHouse: string, user: User){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    const url = `${this.baseUrl}/${idHouse}/worker/create`;

    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    }
    return this.http.post<IWorker>(url, body, { 
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
