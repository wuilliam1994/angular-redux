import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { House } from '../../interfaces/house.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() generate = new EventEmitter<any>();

  @Input() data!: Observable<any[]>;
  @Input() class!: string[];
  @Input() listHeaders: any;
  @Input() link!: string;
  @Input() showNexts: boolean = false;
  @Input() btnEdit: boolean = true;
  @Input() generateQr: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  objectKeys = Object.keys;
  dataSource = new MatTableDataSource<House>();
  baseUrlImage = environment.baseDirectoryImage;
  numElements: number = 0;
  
constructor( private router: Router){}

  ngOnInit() {
    console.log(this.listHeaders);
    console.log(this.generateQr);
    this.numElements = Object.keys(this.listHeaders).length;
    
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
  }

  nextElement(element: any){
    this.router.navigate(['/home/table'], {
      state: element
    });
  }

  generarQr(element: any) {
    this.generate.emit(element);
  }

}
