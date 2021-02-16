import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';
import {TrainingComponent} from './Components/training/training.component';
import {HomePageComponent} from './Components/home-page/home-page.component';
import {PoleTrainingComponent} from './Components/pole-training/pole-training.component';
import {CreateEnterpriseComponent} from './Components/create-enterprise/create-enterprise.component';
import {IntroSplashComponent} from './Components/intro-splash/intro-splash.component';
import {CreateEnterpriseQuestionsComponent} from './Components/create-enterprise-questions/create-enterprise-questions.component';
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
    component: CreateEnterpriseComponent,
    children: [
      {
        path: '',
        component: IntroSplashComponent
      },
      {
        path: 'sas',
        component: CreateEnterpriseQuestionsComponent
      }
    ]
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
