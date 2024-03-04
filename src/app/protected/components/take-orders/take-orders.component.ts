import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TakeOrdersService } from '../../services/take-orders/take-orders.service';
import { Category } from '../../interfaces/category.interface';
import { TableService } from '../../services/table/table.service';
import { Table } from '../../interfaces/table.interface';

@Component({
  selector: 'app-take-orders',
  templateUrl: './take-orders.component.html',
  styleUrls: ['./take-orders.component.scss']
})
export class TakeOrdersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private takeOrdersService: TakeOrdersService, private tableService: TableService){}
  idHouse: string = '';
  tableSelected?: string;
  tableList: Table[] = [];

  ngOnInit(): void {
    
    this.idHouse = localStorage.getItem('houseWorker')!;

    this.tableService
      .listTables(this.idHouse)
      .subscribe((item) => {
        this.tableList = item?.data['table']!;
      });
    
  }
  
  selectCategory(target: any) {
    this.takeOrdersService.getMenu(this.idHouse, target.value).subscribe(menu => console.log(menu));
  }


}
