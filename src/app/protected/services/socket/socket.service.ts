import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable, map } from 'rxjs';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() {
    // this.socket.emit('join_room', 'sala 1')
  }


  // sendMessage(msg: string) {
  //   this.socket.emit('pedidos', msg);
  // }
  // getMessage() {
  //   return this.socket.fromEvent('pedidos').pipe(map(data => console.log(data)));
  // }





  // joinRoom(idHouse: string) {
  //   this.socket.emit('join_room', idHouse)
  // }

  // sendMessage(message: string){
  //   console.log('socket send');
    
  //   this.socket.emit('pedidos', message);
  // }

  // getMessages(): Observable<any> {

  //   let observable = new Observable<{ user: String, message: String }>(observer => {
  //     console.log('socket get');
      
  //     this.socket.on('pedidos', (data) => {
  //       console.log(data);
        
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }
  

}
