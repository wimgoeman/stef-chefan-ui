import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { HomeComponent } from './home/home.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';


const redirectToLogin = redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'pickups/:id',
    component: PickupFormComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'pickups/:pickupId/orders/:orderId',
    component: OrderFormComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
