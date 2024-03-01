import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HouseComponent } from './components/house/house.component';
import { TableComponent } from './components/table/table.component';
import { AccountComponent } from './components/account/account.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditHouseDialogComponent } from './components/dialog/edit-house-dialog/edit-house-dialog.component';
import { AngularMaterialModule } from './angular-material.module';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { HouseModalComponent } from './shared/house-modal/house-modal.component';
import { GenericModalEditComponent } from './shared/generic-modal-edit/generic-modal-edit.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';

// const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} };


@NgModule({
  declarations: [
    DashboardComponent,
    HouseComponent,
    TableComponent,
    AccountComponent,
    CategoryComponent,
    MenuComponent,
    EditHouseDialogComponent,
    DataTableComponent,
    HouseModalComponent,
    GenericModalEditComponent,
    KitchenComponent,

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    // SocketIoModule.forRoot(config)
  ],
})
export class ProtectedModule { }
