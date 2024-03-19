import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TakeOrdersService } from '../../services/take-orders/take-orders.service';
import { TableService } from '../../services/table/table.service';
import { ConsumedService } from '../../services/consumed/consumed.service';
import { AccountService } from '../../services/account/account.service';
import { Table } from '../../interfaces/table.interface';
import { Menu, Product } from '../../interfaces/food-menu.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface ProductSelected {
  cant: number;
  menu: string;
}
@Component({
  selector: 'app-consumer-orders',
  templateUrl: './consumer-orders.component.html',
  styleUrls: ['./consumer-orders.component.scss']
})
export class ConsumerOrdersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private takeOrdersService: TakeOrdersService, private tableService: TableService, private accountService: AccountService, private consumedService: ConsumedService, private router: Router){}
  idHouse: string = '';
  idTable: string = '';
  categorySelected: string = '';
  menuList: Menu[] = [];
  productCounters: { [key: string]: number } = {};
  subtotals: { [key: string]: number } = {};
  totalAccount: number = 0;
  productsSelected: ProductSelected[] = [];
  baseUrl: string = environment.baseURL.substring(0, environment.baseURL.length - 4);


  ngOnInit(): void {
    //"http://localhost:4001/api?house=65ee2ff7b4ccfb020be2e761&table=65ee2ff7b4ccfb020be2e763"
    //":idHouse/:idTable/consumed/insert"

    const url = this.router.url;
    this.idHouse = url.substring(url.indexOf('house') + 6, url.indexOf('&')); 
    this.idTable = url.substring(url.indexOf('table') + 6, url.length);

    this.searchMenu();
  }
  
  searchMenu() {
    this.takeOrdersService.getFoodMenu(this.idHouse,  this.idTable).subscribe(item => {
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

    this.accountService.createAccount(this.idHouse, this.idTable).subscribe({
      next: (resp)=> {
        this.openTake(resp.account.id);
      }
    })

  }


  openTake(idAccount: string) {
    //"/:house/:table/:account/consumed/insert"
    console.log(this.productsSelected);
    
    const productsSelected = this.productsSelected.filter(item => item.cant !== 0);

    this.consumedService.addConsumed(this.idHouse, this.idTable, idAccount, {product: productsSelected}).subscribe({
      next: (resp) => {
        console.log(resp);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
