import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user.interface';
import { WorkerService } from '../../services/worker/worker.service';
import { HouseService } from '../../services/house/house.service';
import { House } from '../../interfaces/house.interface';
import Swal from 'sweetalert2';
import { GenericModalEditComponent } from '../../shared/generic-modal-edit/generic-modal-edit.component';
import { of } from 'rxjs';
import { WorkerDataService } from '../../services/worker/worker-data.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  columnHeader = {
    house: 'Casa',
    username: 'Usuario',
    email: 'Correo',
  };
  listHouses: House[] = [];
  linkTable = 'table';
  selectedHouse: string = '';
  listData: any[] = [];
  constructor(
    private workerService: WorkerService,
    public workerDataService: WorkerDataService,
    private houseService: HouseService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.workerDataService.setListWorker = [];
    this.houseService.listHouses().subscribe({
      next: (items) => {
        this.listHouses = items?.data['house'] as House[];
      }
    })
  }

  changeHouse(target: any) {
    this.selectedHouse = target.value;
    this.loadData(this.selectedHouse);
  }

  loadData(idHouse: string) {
    this.workerService.listWorkers(idHouse).subscribe({
      next: (resp) => {
        
        const listWorkers = resp?.data.worker;        
        listWorkers!.forEach(element => {
          this.listData.push({idHouse: element.house._id, house: element.house.name,idWorker: element.user._id, username: element.user.username, email: element.user.email})
        })
        return (this.workerDataService.setListWorker = this.listData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  onAdd() {
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: { 'Nombre de Usuario': '', 'Correo': '' , 'Contraseña': '' },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        console.log(result['Contraseña']);
        
        let element = {
          username: result['Nombre de Usuario'],
          email: result['Correo'],
          password: result['Contraseña']
        }
        console.log(this.selectedHouse);
        
        this.workerService.addWorker(this.selectedHouse, element as User).subscribe({
          next: (element) => {
            Swal.fire({
              title: 'Added!',
              text: 'Your file has been added.',
              icon: 'success',
            }).then(()=>{
              this.loadData(this.selectedHouse);
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            });
          }
        });
      }
    });
  }

  onDelete(element: any) {
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
        this.workerService.deletedWorker(element.idHouse, element.idWorker).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            }).then(() => {
              this.listData = this.listData.filter(
                (data) => data.idWorker !== element.idWorker
              );
              return (this.workerDataService.setListWorker = this.listData);
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
