import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../../services/table/table.service';
import { House } from '../../interfaces/house.interface';
import { Table } from '../../interfaces/table.interface';
import { TableDataService } from '../../services/table/table-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalEditComponent } from '../../shared/generic-modal-edit/generic-modal-edit.component';
import Swal from 'sweetalert2';
import { HouseService } from '../../services/house/house.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  objetoParametro!: House;
  listTable: Table[] = [];
  houseList: House[] = [];

  houseSelected?: string;
  cantTables: number = 0;
  columnHeader = {
    number: 'Number',
    createdAt: 'Fecha Creacion',
  };
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    public tableDataService: TableDataService,
    private houseService: HouseService,
    private dialog: MatDialog
  ) {
    this.objetoParametro = history.state as House;
    if (this.objetoParametro._id) {
      this.cantTables = this.objetoParametro.cantTables;
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.tableDataService.setListTable = [];
    this.houseService
      .listHouses()
      .subscribe(
        (houses) => (this.houseList = houses?.data['house'] as House[])
      );
  }
  selectHouse(target: any) {
    this.houseSelected = target.value;
    this.cantTables = this.houseList.find(house => house._id === this.houseSelected)?.cantTables!;
    this.loadData();
  }

  private async loadData() {
    const house = this.objetoParametro._id
      ? this.objetoParametro._id
      : this.houseSelected;
    console.log(house);
    
    this.tableService.listTables(house!).subscribe({
      next: (resp) => {
        this.listTable = resp?.data['table'] || [];
        return (this.tableDataService.setListTable = this.listTable);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: { Number: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let element = {
          number: result['Number'],
        };
        const house = this.objetoParametro._id
        ? this.objetoParametro._id
        : this.houseSelected;
        this.tableService.addTable(element, house!).subscribe({
          next: (resp) => {
            console.log(resp);
            Swal.fire({
              title: 'Added!',
              text: 'Your file has been added.',
              icon: 'success',
            }).then(() => {
              this.loadData();
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
            });
          },
        });
      }
    });
  }

  onEdit(element: Table) {
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: { Number: element.number },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.number = parseInt(result['Number']);

        this.tableService.editTable(element).subscribe({
          next: (resp) => {},
          error: (err) => console.log(err),
        });
      }
    });
  }

  onDelete(element: Table) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tableService.deleteTable(element).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            }).then(() => {
              this.listTable = this.listTable.filter(
                (table) => table !== element
              );
              return (this.tableDataService.setListTable = this.listTable);
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Error deleted.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
