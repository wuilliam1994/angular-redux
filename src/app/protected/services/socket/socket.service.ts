import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ISocket } from '../../interfaces/socket.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  houseWorker = '';
  constructor(private socket: Socket) {
    this.houseWorker = localStorage.getItem('houseWorker')!;
    this.socket.emit('join_room', 'test')
  }


  sendMessage(objSen: any) {
    this.socket.emit('pedidos', {room:  this.houseWorker, pedido: objSen});
  }
  
  getMessage() {
    return this.socket.fromEvent('pedidos').pipe(map(data => data));
  }
}
