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



@NgModule({
  declarations: [
    DashboardComponent,
    HouseComponent,
    TableComponent,
    AccountComponent,
    CategoryComponent,
    MenuComponent,
    EditHouseDialogComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class ProtectedModule { }
