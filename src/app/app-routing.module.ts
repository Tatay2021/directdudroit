import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent
  },
  {
    path: '**',
    component: NavBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
