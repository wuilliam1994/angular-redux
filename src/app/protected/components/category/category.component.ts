import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { House } from '../../interfaces/house.interface';
import { Table } from '../../interfaces/table.interface';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalEditComponent } from '../../shared/generic-modal-edit/generic-modal-edit.component';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interfaces/category.interface';
import { CategoryDataService } from '../../services/category/category-data.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HouseService } from '../../services/house/house.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})

export class CategoryComponent implements OnInit {
  // objetoParametro!: House;
  listCategory!: Category[];
  columnHeader = {
    name: 'Nombre',
    description: 'Descripcion',
  };
  // toppings = new FormControl('');

  // toppingList: string[] = [];
  houses: House[] = [];
  selectedElemento?: string;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public categoryDataService: CategoryDataService,
    public houseService: HouseService,
    private dialog: MatDialog
  ) {
    // this.objetoParametro = history.state as House;
  }

  ngOnInit(): void {
    this.categoryDataService.setListCategory = [];
    this.houseService.listHouses().subscribe((items) => {
      // this.toppingList = items!.data['house'].map((house) => house.name);
      this.houses = items!.data['house'];
    });
  }

  mostrarValores(target: any) {
    this.selectedElemento = target.value;
    this.loadData();
  }

  private async loadData() {
    this.categoryService.listCategories(this.selectedElemento!).subscribe({
      next: (resp) => {
        this.listCategory = resp?.data['category'] || [];
        return this.categoryDataService.setListCategory = this.listCategory;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAdd() {
    if (this.selectedElemento) {
      const dialogRef = this.dialog.open(GenericModalEditComponent, {
        width: '40%',
        data: { Categoria: '', Descripcion: '' },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        let element = {
          name: result['Categoria'],
          description: result['Descripcion']
        };
        this.categoryService
          .addCategory(element, this.selectedElemento!)
          .subscribe({
            next: (resp) => {
              console.log(resp);
              Swal.fire({
                title: 'Added!',
                text: 'La categoria a sido adicionada correctamente.',
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
      });
    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Seleccione una casa.',
        icon: 'warning',
      })
    }
  }

  onEdit(element: Category) {
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: { Categoria: element.name, Descripcion: element.description },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.name = result['Categoria'];
        element.description = result['Descripcion'];
        this.categoryService.editCategory(element).subscribe({
          next: (resp) => {},
          error: (err) => console.log(err),
        });
      }
    });
  }

  onDelete(element: Category) {
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
        this.categoryService.deleteCategory(element).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            }).then(() => {
              this.listCategory = this.listCategory.filter(
                (category) => category !== element
              );
              return (this.categoryDataService.setListCategory = this.listCategory);
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
