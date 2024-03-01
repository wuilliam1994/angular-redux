import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HouseComponent } from './components/house/house.component';
import { AccountComponent } from './components/account/account.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { TableComponent } from './components/table/table.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children:[
      // {
      //   path: "start",
      //   component: StartComponent
      // },
      {
        path: "account",
        component: AccountComponent
      },
      {
        path: "category",
        component: CategoryComponent
      },
      {
        path: "house",
        component: HouseComponent
      },
      {
        path: "menu",
        component: MenuComponent
      },
      {
        path: "table",
        component: TableComponent
      },
      {
        path: "kitchen",
        component: KitchenComponent
      },
      {
        path: "**",
        redirectTo: ""
      },
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
