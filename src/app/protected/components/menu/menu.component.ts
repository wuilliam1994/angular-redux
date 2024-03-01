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
import { TestDataService } from '../../services/test-data.service';

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
    private dialog: MatDialog,
    private testDataService: TestDataService
  ) {
  }
  
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
        data: { Producto: '', Precio: '', Cantidad: ''},
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.testDataService.getListTable.subscribe(items => {
          extImag = items.type;
          this.transImgBin(items)
          .then(value => {
            console.log(value);
            imgBin = value
            let element = {
              product: result['Producto'],
              price: result['Precio'],
              cantidad: result['Cantidad'],
              photo: imgBin,
              extension: extImag,
            };
            this.menuService
              .addMenu(element, this.houseSelected!, this.categorySelected!)
              .subscribe({
                next: (resp) => {
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
          })
          .catch(err => console.log(err));
        });
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
        (element.product = result['Producto']),
          (element.price = result['Precio']),
          (element.cantidad = result['Cantidad']),
        this.menuService
          .editMenu(element, this.houseSelected!, this.categorySelected!)
          .subscribe({
            next: (resp) => {},
            error: (err) => console.log(err),
          });
      }
    });
  }

  onDelete(element: Menu) {
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
        this.menuService
          .deleteMenu(element, this.houseSelected!, this.categorySelected!)
          .subscribe({
            next: () => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              }).then(() => {
                this.listMenu = this.listMenu.filter(
                  (menu) => menu !== element
                );
                return (this.menuDataService.setListMenu = this.listMenu);
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

  transImgBin(imagenFile: File): Promise<any> {
    // Función para convertir una imagen a BinData
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);

          resolve(uint8Array);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsArrayBuffer(imagenFile);
      });
  }
}
