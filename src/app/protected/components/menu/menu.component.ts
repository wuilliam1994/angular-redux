import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { MenuDataService } from '../../services/menu/menu-data.service';
import { HouseService } from '../../services/house/house.service';
import { CategoryService } from '../../services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { House } from '../../interfaces/house.interface';
import { Category } from '../../interfaces/category.interface';
import { GenericModalEditComponent } from '../../shared/generic-modal-edit/generic-modal-edit.component';
import Swal from 'sweetalert2';
import { Upload } from '../../interfaces/upload.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // objetoParametro!: House;
  listMenu!: Menu[];
  columnHeader = {
    product: 'Producto',
    price: 'Precio',
    cantidad: 'Cantidad',
    photo: 'Foto',
  };

  // <img id="imagenBinaria" alt="Imagen en binData">

  houseSelected?: string;
  categorySelected?: string;

  houseList: House[] = [];
  categoryList: Category[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    public menuDataService: MenuDataService,
    public houseService: HouseService,
    public categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.menuDataService.setListMenu = [];

    this.houseService.listHouses().subscribe((items) => {
      this.houseList = items!.data['house'];
    });
  }

  selectHouse(target: any) {
    this.houseSelected = target.value;

    this.categoryService
      .listCategories(this.houseSelected!)
      .subscribe((items) => {
        this.categoryList = items!.data['category'];
      });
    // this.loadData();
  }

  selectCategory(target: any) {
    this.categorySelected = target.value;

    this.loadData();
  }

  private async loadData() {
    this.menuService
      .listMenus(this.houseSelected!, this.categorySelected!)
      .subscribe({
        next: (resp) => {
          this.listMenu = resp?.data['menu'] || [];

          return (this.menuDataService.setListMenu = this.listMenu);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onAdd() {
    let extImag: string = '';
    let imgBin: any[] = [];
    if (this.houseSelected && this.categorySelected) {
      const dialogRef = this.dialog.open(GenericModalEditComponent, {
        width: '40%',
        // height: '100%',
        data: { Producto: '', Precio: '', Cantidad: '' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.menuService
            .uploadImg(result['file'], this.houseSelected!)
            .subscribe((item) => {

              let element = {
                product: result['Producto'],
                price: result['Precio'],
                cantidad: result['Cantidad'],
                photo: item?.data['name'],
              };
              this.menuService
                .addMenu(element, this.houseSelected!, this.categorySelected!)
                .subscribe({
                  next: (resp) => {
                    Swal.fire({
                      title: 'Added!',
                      text: 'El menu a sido adicionado correctamente.',
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
        }
      });
    }
  }

  onEdit(element: Menu) {
    const dialogRef = this.dialog.open(GenericModalEditComponent, {
      width: '40%',
      data: {
        Producto: element.product,
        Precio: element.price,
        Cantidad: element.cantidad,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.product = result['Producto'];
        element.price = result['Precio'];
        element.cantidad = result['Cantidad'];
        if (result['file'] !== undefined) {
          this.menuService
            .deleteImgUp(element.photo, this.houseSelected!)
            .subscribe((photoDeleted) => {
              this.menuService
                .uploadImg(result['file'], this.houseSelected!)
                .subscribe((photoAdd) => {
                  element.photo = photoAdd?.data['name']!;

                  this.menuService
                    .editMenu(
                      element,
                      this.houseSelected!,
                      this.categorySelected!
                    )
                    .subscribe({
                      next: (resp) => {},
                      error: (err) => console.log(err),
                    });
                });
            });
        }
      }
    });
  }

  onDelete(element: Menu) {
    Swal.fire({
      title: 'Usted esta seguro de querer eliminar el elemento?',
      text: 'Esta accion no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService
          .deleteImgUp(element.photo, this.houseSelected!)
          .subscribe({
            next: () => {
              this.menuService
                .deleteMenu(
                  element,
                  this.houseSelected!,
                  this.categorySelected!
                )
                .subscribe({
                  next: (menuDelete) => {
                    Swal.fire({
                      title: 'Eliminado!',
                      text: 'Elemento eliminado exitosamente.',
                      icon: 'success',
                    }).then(() => {

                      const menuString = JSON.stringify(menuDelete.body?.data['menu']);
                      const test: Menu = JSON.parse(menuString)
                      
                      // this.listMenu = this.listMenu.filter(
                      //   (menu) => menu._id !== test._id
                      // );
                      // return (this.menuDataService.setListMenu = this.listMenu);
                      this.loadData();
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
