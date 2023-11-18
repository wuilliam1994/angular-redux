import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house/house.service';
import { HouseDataService } from '../../services/house/house-data.service';
import { House } from '../../interfaces/house.interface';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalEditComponent } from '../../shared/generic-modal-edit/generic-modal-edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit {

  columnHeader = {'name': 'Name', 'cantTables': 'Cantidad Tables', 'createdAt': 'Fecha Creacion'};
  listHouses!: House[];

  constructor(private houseService: HouseService, public houseDataService: HouseDataService, private dialog: MatDialog) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private async loadData() {
    this.houseService.listHouses().subscribe({
      next: (resp) => {
        this.listHouses = resp?.data['house'] || [];
        return this.houseDataService.setListHouse = this.listHouses;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDelete(element: House){
    console.log(this.houseDataService.getListHouse);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.houseService.deleteHouse(element).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            }).then(()=>{
              this.listHouses = this.listHouses.filter(house => house !== element);
              return this.houseDataService.setListHouse = this.listHouses;
            });

          },
          error: ()=> {
            Swal.fire({
              title: "Error!",
              text: "Error deleted.",
              icon: "error"
            });
          }
        })
        
      }
    });
  }

  onEdit(element: House){
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: {'Name': element.name, 'Number of Tables': element.cantTables}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.name = result['Name'];
        element.cantTables = parseInt(result['Number of Tables']);

        this.houseService.editHouse(element).subscribe({
          error: err => console.log(err)
        });
      }
    });
  }
}

