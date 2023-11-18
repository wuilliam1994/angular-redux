import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  // columnHeader = {'name': 'Name', 'cantTables': 'Cantidad Tables', 'createdAt': 'Fecha Creacion'};
  // listTables!: Table[];

  // constructor(private tableService: TableService, public tableDataService: TableDataService, private dialog: MatDialog) {
  //   this.loadData();
  // }

  ngOnInit(): void {
  }

  // private async loadData() {
  //   this.tableService.listTables().subscribe({
  //     next: (resp) => {
  //       this.listTables = resp?.data['table'] || [];
  //       return this.tableDataService.setListTable = this.listTables;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // onDelete(element: Table){
  //   console.log(this.tableDataService.getListTable);

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.tableService.deleteTable(element).subscribe({
  //         next: () => {
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your file has been deleted.",
  //             icon: "success"
  //           }).then(()=>{
  //             this.listTables = this.listTables.filter(table => table !== element);
  //             return this.tableDataService.setListTable = this.listTables;
  //           });

  //         },
  //         error: ()=> {
  //           Swal.fire({
  //             title: "Error!",
  //             text: "Error deleted.",
  //             icon: "error"
  //           });
  //         }
  //       })
        
  //     }
  //   });
  // }

  // onEdit(element: Table){
  //   const dialogRef = this.dialog.open(GenericModalEditComponent, {
  //     width: '40%',
  //     data: {'Name': element.name, 'Number of Tables': element.cantTables}
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       element.name = result['Name'];
  //       element.cantTables = parseInt(result['Number of Tables']);

  //       this.tableService.editTable(element).subscribe({
  //         error: err => console.log(err)
  //       });
  //     }
  //   });
  // }
}
