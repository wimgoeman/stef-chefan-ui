import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupsComponent } from './pickups/pickups.component';


const routes: Routes = [
  {
    path: 'pickups',
    component: PickupsComponent
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
