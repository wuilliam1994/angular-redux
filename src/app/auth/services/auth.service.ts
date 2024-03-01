import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthResponce } from '../interfaces/auth.interface';
import { map, tap, Observable, of} from "rxjs";
import { User } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _user!: User;

  get user(){
    return {...this._user};
  }

  constructor( private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(email: string, password: string){
    const url = `${this.baseUrl}/login`;
    const body = {email, password};
    

    return this.http.post<AuthResponce>(url, body, { observe: 'response', responseType: 'json'})
    .pipe(
      tap(resp => {
        if (resp.status === 200 ) {
          this._user = resp.body?.data?.user!
          this.cookieService.set('token', resp.body?.data.token!);
        }
      }),
      map(resp => resp.body )
    );
  }

  register(username: string, email: string, password: string){
    const url = `${this.baseUrl}/register`;
    const body = {username, email, password};
    return this.http.post<AuthResponce>(url, body, { observe: 'response', responseType: 'json'})
    .pipe(
      tap(resp => this.cookieService.set('token', `${resp.body?.data.token}`)),
      map(resp => resp.body)
    );

  }

  getAuthToken(): Observable<boolean>{
    let token = this.cookieService.check('token');
    if (token) {
      return of(true);
    }
    return of(false);
  }

  logout(){
    this.cookieService.delete('token');
    localStorage.clear();
    this.router.navigateByUrl("/auth");
  }
}
