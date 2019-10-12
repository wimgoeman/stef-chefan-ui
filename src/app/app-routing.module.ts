import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { HomeComponent } from './home/home.component';
import { OrderFormComponent } from './order-form/order-form.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pickups/:id',
    component: PickupFormComponent
  },
  {
    path: 'pickups/:pickupId/orders/:orderId',
    component: OrderFormComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
