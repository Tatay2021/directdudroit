import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';
import {TrainingComponent} from './Components/training/training.component';
import {HomePageComponent} from './Components/home-page/home-page.component';
import {PoleTrainingComponent} from './Components/pole-training/pole-training.component';
import {CreateEnterpriseComponent} from './Components/create-enterprise/create-enterprise.component';
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
    path: 'pole-formation',
    component: PoleTrainingComponent
  },
  {
    path: 'me-former-pour-entreprendre',
    component: TrainingComponent
  },
  {
    path: 'enterprise',
    component: CreateEnterpriseComponent
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
