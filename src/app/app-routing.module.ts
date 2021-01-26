import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';
import {TrainingComponent} from './Components/training/training.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent
  },
  {
    path: 'me-former-pour-entreprendre',
    component: TrainingComponent
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
