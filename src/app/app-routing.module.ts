import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, hasRole } from './guard/auth.guard';
import { ConsumerOrdersComponent } from './protected/components/consumer-orders/consumer-orders.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [hasRole(['worker', 'owner'])]
  },
  {
    path: "api",
    component: ConsumerOrdersComponent
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
