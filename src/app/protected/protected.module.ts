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
import { OrdersReadyComponent } from './components/orders-ready/orders-ready.component';
import { TakeOrdersComponent } from './components/take-orders/take-orders.component';
import { WorkerComponent } from './components/worker/worker.component';
import { ConsumerOrdersComponent } from './components/consumer-orders/consumer-orders.component';




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
    OrdersReadyComponent,
    TakeOrdersComponent,
    WorkerComponent,
    ConsumerOrdersComponent

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    
  ],
})
export class ProtectedModule { }
