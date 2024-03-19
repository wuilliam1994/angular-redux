import { Component } from '@angular/core';
import { HouseService } from '../../services/house/house.service';
import { TableService } from '../../services/table/table.service';
import { SocketService } from '../../services/socket/socket.service';
import { ConsumedService } from '../../services/consumed/consumed.service';
import { Table } from '../../interfaces/table.interface';
import { Kitchen, Pending } from '../../interfaces/kitchen.interface';
import { ISocket } from '../../interfaces/socket.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-ready',
  templateUrl: './orders-ready.component.html',
  styleUrls: ['./orders-ready.component.scss']
})
export class OrdersReadyComponent {

  tables: Table[] = []
  ordersReady!: Pending[];
  idHouse: string = '';




  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
 

  constructor(private houseService: HouseService, private tableService: TableService, private socketService: SocketService, private consumedService: ConsumedService){

  }
  
  ngOnInit(): void {
    this.idHouse = localStorage.getItem('houseWorker')!;
    
    // this.getMsg();

      this.consumedService.getAccountReady(this.idHouse).subscribe(ready => {
        
        this.ordersReady =  ready?.data.pending.length !== 0 ? ready?.data.pending! : []; 

      })
  }

  deletedElement(pending : Pending) {
    const idAccounts = pending.account.product.map(element => element.menuProduct._id);
    console.log(idAccounts);
    
    this.consumedService.setAccountInTable(pending.account, this.idHouse, idAccounts).subscribe({
      next: (resp)=> {        
        console.log(resp);
      },
      error: (err)=> {
        console.log(err);
        
      }
    })
    for (let i = 0; i < this.ordersReady.length; i++) {
      if (this.ordersReady[i].account._id === pending.account._id) {
        this.ordersReady.splice(i, 1);
        break;
      }
    }
  }

  // getMsg() {
  //   this.socketService.getMessage().subscribe(item => {
  //     const objSocket = item as ISocket;
  //     console.log(objSocket);      
      
  //     if (objSocket.body.area === 1) {

  //       Swal.fire({
  //         position: "top-end",
  //         icon: "info",
  //         title: "Un orden se ha terminado en la cocina",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //         this.consumedService.getAccountReady(this.idHouse).subscribe(ready => {
  //           this.ordersReady =  ready?.data.pending.length !== 0 ? ready?.data.pending! : []; 
  //         })
  //     }
  //   })
  // }
}
