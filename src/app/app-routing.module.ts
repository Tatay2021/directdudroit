import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';
import {TrainingComponent} from './Components/training/training.component';
import {HomePageComponent} from './Components/home-page/home-page.component';
const routerOptions: ExtraOptions = {
  initialNavigation: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'me-former-pour-entreprendre',
    component: TrainingComponent
  },
  {
    path: '**',
    component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
