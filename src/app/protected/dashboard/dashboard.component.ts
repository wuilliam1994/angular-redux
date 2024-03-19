import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HouseService } from '../services/house/house.service';
import { House } from '../interfaces/house.interface';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { SocketService } from '../services/socket/socket.service';
import { ISocket } from '../interfaces/socket.interface';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  showMenu = false;
  access?: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showMenu = window.innerWidth < 1000;
  }
  constructor(private authService: AuthService, private socketService: SocketService){

  }

  ngOnInit(): void {
    this.getMsg();
    const userLog = JSON.parse(localStorage.getItem('user')!) as User;
    this.access = userLog.role.includes('owner');
  }
  showHouse = false;

  getMsg() {
    this.socketService.getMessage().subscribe(item => {
      const objSocket = item as ISocket;
      console.log(objSocket);      
      
      if (objSocket.body.area === 1) {

        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Un orden se ha terminado en la cocina",
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (objSocket.body.area === 2) {

        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Un nuevo pedido se ha tomado",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  get user(){
    return this.authService.user;
  }
  logout(){
    this.authService.logout();
  }
}
