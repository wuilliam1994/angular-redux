import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HouseComponent } from './components/house/house.component';
import { AccountComponent } from './components/account/account.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { TableComponent } from './components/table/table.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { OrdersReadyComponent } from './components/orders-ready/orders-ready.component';
import { TakeOrdersComponent } from './components/take-orders/take-orders.component';
import { hasRole,} from '../guard/auth.guard';
import { WorkerComponent } from './components/worker/worker.component';

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
        component: AccountComponent,
      },
      {
        path: "category",
        component: CategoryComponent,
        canActivate: [hasRole(['owner'])]

      },
      {
        path: "house",
        component: HouseComponent,
        canActivate: [hasRole(['owner'])]
      },
      {
        path: "menu",
        component: MenuComponent,
        canActivate: [hasRole(['owner'])]

      },
      {
        path: "table",
        component: TableComponent,
        canActivate: [hasRole(['owner'])]

      },
      {
        path: "worker",
        component: WorkerComponent,
        canActivate: [hasRole(['owner'])],
      },
      {
        path: "kitchen",
        component: KitchenComponent,
        canActivate: [hasRole(['worker'])]

      },
      {
        path: "orders-ready",
        component: OrdersReadyComponent,
        canActivate: [hasRole(['worker'])]

      },
      {
        path: "take-orders",
        component: TakeOrdersComponent,
        canActivate: [hasRole(['worker'])],
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
