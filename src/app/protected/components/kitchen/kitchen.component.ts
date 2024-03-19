import { Component, OnInit } from '@angular/core';
import { Account, Kitchen, Pending } from '../../interfaces/kitchen.interface';
import { TableService } from '../../services/table/table.service';
import { Table } from '../../interfaces/table.interface';
import { HouseService } from '../../services/house/house.service';
import { House } from '../../interfaces/house.interface';
import { SocketService } from '../../services/socket/socket.service';
import { ObservableNotification } from '@ngrx/effects/src/utils';
import { BehaviorSubject } from 'rxjs';
import { ConsumedService } from '../../services/consumed/consumed.service';
import { ISocket } from '../../interfaces/socket.interface';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {
  tables: Table[] = []
  kitchenPending!: Pending[];
  idHouse: string = "";


  constructor(private houseService: HouseService, private tableService: TableService, private socketService: SocketService, private consumedService: ConsumedService){

  }
  
  ngOnInit(): void {
    
    this.idHouse = localStorage.getItem('houseWorker')!;
    
    // this.getMsg();
    
    this.consumedService.getConsumedPending(this.idHouse).subscribe(pending => {
      this.kitchenPending =  pending?.data.pending.length !== 0 ? pending?.data.pending! : [];
    })
    
  }

  sendMsg(){
    //area 1 es cocina area 2 es camarera de salon
    const objSen = {
      area: 1,
    }

    this.socketService.sendMessage(objSen);
  }

  deletedElement(pending : Pending) {
    const idConsumeds = pending.account.product.map(element => element.menuProduct._id);
    
    this.consumedService.setConsumedReady(pending.account, this.idHouse, idConsumeds).subscribe({
      next: (resp)=> {
        this.sendMsg();
        console.log(resp);
      },
      error: (err)=> {
        console.log(err);
        
      }
    })
    for (let i = 0; i < this.kitchenPending.length; i++) {
      if (this.kitchenPending[i].account._id === pending.account._id) {
        this.kitchenPending.splice(i, 1);
        break;
      }
      
    }
  }

  // getMsg() {
  //   this.socketService.getMessage().subscribe(item => {
  //     const objSocket = item as ISocket;
      
  //     if (objSocket.body.area === 2) {

  //       Swal.fire({
  //         position: "top-end",
  //         icon: "info",
  //         title: "Un nuevo pedido se ha tomado",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });

  //       this.consumedService.getConsumedPending(this.idHouse).subscribe(pending => {
  //         this.kitchenPending =  pending?.data.pending.length !== 0 ? pending?.data.pending! : []; 
  //       })

  //     }
  //   })
  // }

 

}
