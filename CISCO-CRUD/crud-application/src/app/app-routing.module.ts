import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';

const routes: Routes = [
  {path:'login-Page',component:LoginPageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'edit-popup',component:EditPopupComponent},
  {path:'delete-popup',component:DeletePopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
