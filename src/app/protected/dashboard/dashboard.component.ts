import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HouseService } from '../services/house/house.service';
import { House } from '../interfaces/house.interface';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent {
  showMenu = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showMenu = window.innerWidth < 1000;
  }
  constructor(private authService: AuthService, private houseService: HouseService){

  }
  showHouse = false;
  elementsTable: House[] = [];

  get user(){
    return this.authService.user;
  }
  logout(){
    this.authService.logout();
  }
}
