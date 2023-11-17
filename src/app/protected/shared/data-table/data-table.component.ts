import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '../../interfaces/response.interface';
import { House } from '../../interfaces/house.interface';
import { Observable } from 'rxjs';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { HouseModalComponent } from '../house-modal/house-modal.component';
import { MatDialog } from '@angular/material/dialog';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
    @Input() houses!: Observable<House[]>;
    @Input() listHeaders!: string[];

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<House>();
  columns: any[] = [];
  displayedColumns: any;
  
  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.loadHouses();
    
    this.houses.subscribe((houses) => {
      if (houses.length) {
        this.columns = this.listHeaders.map((header, index) => {
          let key = Object.keys(houses[0])[index + 2];
          return {
            columnDef: key,
            header: header,
            cell: (element: House) => `${(element as any)[key]}`,
            type: 'string'
          }
        });
        this.columns.push({
          columnDef: 'actions',
          header: 'Actions',
          cell: () => {},
          type: 'array'
    
        });
        this.displayedColumns = this.columns.map(c => c.columnDef);
      }
    });

  }  

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
  

  loadHouses() {
    this.houses.subscribe((resp) => {
      if (resp.length) {
        this.dataSource.data = resp;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  editElement(element: House) {
    const dialogRef = this.dialog.open(HouseModalComponent, {
      width: '40%',
      data: element
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteElement(element: House) {
    // Implement your delete logic here
    console.log(element);
  }
}