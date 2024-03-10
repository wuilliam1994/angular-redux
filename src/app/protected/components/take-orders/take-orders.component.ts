import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TakeOrdersService } from '../../services/take-orders/take-orders.service';
import { Category } from '../../interfaces/category.interface';
import { TableService } from '../../services/table/table.service';
import { Table } from '../../interfaces/table.interface';
import { AccountService } from '../../services/account/account.service';
import { Menu, Product } from '../../interfaces/food-menu.interface';
import { ConsumedService } from '../../services/consumed/consumed.service';

interface ProductSelected {
  cant: number;
  menu: string;
}
@Component({
  selector: 'app-take-orders',
  templateUrl: './take-orders.component.html',
  styleUrls: ['./take-orders.component.scss']
})
export class TakeOrdersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private takeOrdersService: TakeOrdersService, private tableService: TableService, private accountService: AccountService, private consumedService: ConsumedService){}
  idHouse: string = '';
  categorySelected: string = '';
  tableSelected?: string = '';
  tableList: Table[] = [];
  menuList: Menu[] = [];
  productCounters: { [key: string]: number } = {};
  subtotals: { [key: string]: number } = {};
  totalAccount: number = 0;
  productsSelected: ProductSelected[] = [];


  ngOnInit(): void {
    
    this.idHouse = localStorage.getItem('houseWorker')!;

    this.tableService
      .listTables(this.idHouse)
      .subscribe((item) => {
        this.tableList = item?.data['table']!;
      });
    
  }
  
  selectTable(target: any) {
    this.tableSelected = target.value;
    this.takeOrdersService.getFoodMenu(this.idHouse, target.value).subscribe(item => {
      this.menuList = item?.data.menu!;
      console.log(this.menuList);
      
    });
  }


  addProductToOrder(product: Product) {
    if (this.productCounters[product._id] === undefined) {
      this.productCounters[product._id] = 0;
      this.productsSelected.push({cant:0, menu: product._id});
    }
    this.productCounters[product._id]++;
    this.productsSelected.find(item => item.menu === product._id)!.cant++;
    this.calculateSubtotal(product);
    this.calculateTotalAccount();
  }

  subProductToOrder(product: Product) {
    // if (!this.productCounters[product._id]) {
    //   this.productCounters[product._id] = 0;
    //   this.productsSelected.push({cant:0, menu: product._id});
    // }
    this.productCounters[product._id]--;
    this.productsSelected.find(item => item.menu === product._id)!.cant--;
    this.calculateSubtotal(product);
    this.calculateTotalAccount();
  }
  
  calculateSubtotal(product: Product) {
    this.subtotals[product._id] = product.price * this.productCounters[product._id];
  }
  
  calculateTotalAccount() {
    this.totalAccount = Object.values(this.subtotals).reduce((acc, curr) => acc + curr, 0);
  }

  openAccount() {
    // /:house/:table/account/insert

    this.accountService.createAccount(this.idHouse, this.tableSelected!).subscribe({
      next: (resp)=> {
        this.openTake(resp.account.id);
      }
    })

  }


  openTake(idAccount: string) {
    "/:house/:table/:account/consumed/insert"
    //   {
    //     "product": [
    //         {"cant": 2, "menu": "65db647ebb3ff24db2bb47b9"},
    //         {"cant": 1, "menu": "65db648fbb3ff24db2bb47be"},
    //         {"cant": 3, "menu": "65db6550bb3ff24db2bb47ce"},
    //         {"cant": 2, "menu": "65db6571bb3ff24db2bb47d8"}
    //     ]
    // }
    //aqui va lo que se va a consumir

    console.log(this.productsSelected);
    
    const productsSelected = this.productsSelected.filter(item => item.cant !== 0);

    this.consumedService.addConsumed(this.idHouse, this.tableSelected!, idAccount, {product: productsSelected}).subscribe({
      next: (resp) => {
        console.log(resp);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })




  }


}
