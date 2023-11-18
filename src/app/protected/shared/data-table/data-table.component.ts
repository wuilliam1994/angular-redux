import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { House } from '../../interfaces/house.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @Input() data!: Observable<any[]>;
  @Input() listHeaders: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  objectKeys = Object.keys;
  dataSource = new MatTableDataSource<House>();


  ngOnInit() {
    this.data.subscribe((resp) => {
      if (resp.length) {
        this.dataSource.data = resp;
      }
    });
    
  }
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editElement(element: any) {
      this.edit.emit(element);

      
    }

    deleteElement(element: any) {
      this.delete.emit(element);
      // console.log(element);
    }
}
