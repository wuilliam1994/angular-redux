import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HouseService } from '../services/house.service';
import { House } from '../interfaces/house.interface';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent {
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
 
  // listHouses(){
  //   this.houseService.listHouses().subscribe({
  //     next: (resp) => {
  //       if (resp?.status === 200) {
  //         this.elementsTable = resp.data["house"];
  //         this.showHouse = true;
  //       }
  //     },
  //     error: (err) => {
  //       return err;
  //     },
  //   });
  // }


  // listHouses(): Observable<House[]> {
  //   return this.houseService.listHouses().subscribe({
  //     next: (result) => {
  //       if (result?.status === 200) {
  //         return result.data["house"] as House[];
  //       } else {
  //         throw new Error('Error al obtener los datos de las casas');
  //       }
  //     }
  //   })
      
  //   )};
}
