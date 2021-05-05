import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { TrainingComponent } from './Components/training/training.component';
import {MatMenuModule} from '@angular/material/menu';
import { NavComponent } from './Components/nav/nav.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { PoleTrainingComponent } from './Components/pole-training/pole-training.component';
import {MatListModule} from '@angular/material/list';
import { CreateEnterpriseComponent } from './Components/create-enterprise/create-enterprise.component';
import { IntroSplashComponent } from './Components/intro-splash/intro-splash.component';
import { CreateEnterpriseQuestionsComponent } from './Components/create-enterprise-questions/create-enterprise-questions.component';
import {FormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { PaymentComponent } from './Components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TrainingComponent,
    NavComponent,
    HomePageComponent,
    PoleTrainingComponent,
    CreateEnterpriseComponent,
    IntroSplashComponent,
    CreateEnterpriseQuestionsComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
