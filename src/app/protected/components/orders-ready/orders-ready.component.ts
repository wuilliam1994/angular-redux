import { Component } from '@angular/core';
import { HouseService } from '../../services/house/house.service';
import { TableService } from '../../services/table/table.service';
import { SocketService } from '../../services/socket/socket.service';
import { ConsumedService } from '../../services/consumed/consumed.service';
import { Table } from '../../interfaces/table.interface';
import { Kitchen } from '../../interfaces/kitchen.interface';
import { ISocket } from '../../interfaces/socket.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-ready',
  templateUrl: './orders-ready.component.html',
  styleUrls: ['./orders-ready.component.scss']
})
export class OrdersReadyComponent {

  arrayTable: string[] = [];
  tables: Table[] = []
  ordersReady: Kitchen = {
    pending:   [
      {
        "_id": "65dc9d58512eb37de483b296",
        "account": {
            "_id": "65dc9c05512eb37de483b28e",
            "table": {
                "_id": "65db5bf7fa0ff0c68ffe96ab",
                "number": 1
            }
        },
        "menuProduct": {
            "_id": "65db647ebb3ff24db2bb47b9",
            "product": "agua natural"
        },
        "cantProduct": 2,
        "balanceProduct": 4,
        "ready": false,
        "createdAt": new Date("2024-02-26T14:16:56.251Z"),
        "updatedAt": new Date("2024-02-26T14:16:56.251Z")
    },
    {
        "_id": "65dc9d58512eb37de483b297",
        "account": {
            "_id": "65dc9c05512eb37de483b28e",
            "table": {
                "_id": "65db5bf7fa0ff0c68ffe96ab",
                "number": 1
            }
        },
        "menuProduct": {
            "_id": "65db648fbb3ff24db2bb47be",
            "product": "refresco de cola"
        },
        "cantProduct": 1,
        "balanceProduct": 4,
        "ready": false,
        "createdAt": new Date("2024-02-26T14:16:56.251Z"),
        "updatedAt": new Date("2024-02-26T14:16:56.251Z")
    },
    {
        "_id": "65dc9d58512eb37de483b298",
        "account": {
            "_id": "65dc9c05512eb37de483b28e",
            "table": {
                "_id": "65db5bf7fa0ff0c68ffe96ab",
                "number": 1
            }
        },
        "menuProduct": {
            "_id": "65db6550bb3ff24db2bb47ce",
            "product": "arroz blanco"
        },
        "cantProduct": 3,
        "balanceProduct": 300,
        "ready": false,
        "createdAt": new Date("2024-02-26T14:16:56.251Z"),
        "updatedAt": new Date("2024-02-26T14:16:56.251Z")
    },
    {
        "_id": "65dc9d58512eb37de483b299",
        "account": {
            "_id": "65dc9c05512eb37de483b28e",
            "table": {
                "_id": "65db5bf7fa0ff0c68ffe96ab",
                "number": 1
            }
        },
        "menuProduct": {
            "_id": "65db6571bb3ff24db2bb47d8",
            "product": "sopa amarilla"
        },
        "cantProduct": 2,
        "balanceProduct": 260,
        "ready": false,
        "createdAt": new Date("2024-02-26T14:16:56.251Z"),
        "updatedAt": new Date("2024-02-26T14:16:56.251Z")
    }
    ]
  }



  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
 

  constructor(private houseService: HouseService, private tableService: TableService, private socketService: SocketService, private consumedService: ConsumedService){

  }
  
  ngOnInit(): void {
    
    this.getMsg();

    this.houseService.getHouseUser().subscribe(house => {
      this.consumedService.getConsumedReady(house?.house!).subscribe(pending => {
        const ordersReady = pending?.data['pending'] as Kitchen[];
        console.log(ordersReady);
        if (ordersReady.length !== 0) {
          this.ordersReady = ordersReady[0]; 
        }
      })
    })
    
  }

  // sendMsg(){
  //   //area 1 es cocina area 2 es camarera de salon
  //   const objSen = {
  //     area: 1,
  //   }

  //   this.socketService.sendMessage(objSen);
  // }

  deletedElement(element: number) {
    // this.sendMsg();
    this.arrayTable.splice(element, 1);    
    this.ordersReady.pending.splice(element, 1);    
  }

  getMsg() {
    this.socketService.getMessage().subscribe(item => {
      const objSocket = item as ISocket;
      
      if (objSocket.body.area === 1) {

        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Un nuevo pedido se ha terminado",
          showConfirmButton: false,
          timer: 1500
        });

        this.houseService.getHouseUser().subscribe(house => {
          this.consumedService.getConsumedReady(house?.house!).subscribe(pending => {
            const ordersReady = pending?.data['pending'] as Kitchen[];
            console.log(ordersReady);
            if (ordersReady.length !== 0) {
              this.ordersReady = ordersReady[0]; 
            }
          })
        })

      }
    })
  }
}
