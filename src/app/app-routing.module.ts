import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupFormComponent } from './pickup-form/pickup-form.component';


const routes: Routes = [
  {
    path: 'pickups',
    component: PickupFormComponent
  },
  {
    path: '',
    redirectTo: '/pickups',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
