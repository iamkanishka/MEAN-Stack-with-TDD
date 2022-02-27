import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { DashboardComponent} from '../app/dashboard/dashboard.component'
const routes: Routes = [
  { path: 'home', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
