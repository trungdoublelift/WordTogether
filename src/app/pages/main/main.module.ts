import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ShareModule } from 'src/app/shared/share/share.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';



@NgModule({
  declarations: [
    MainComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule,

  ]
})
export class MainModule { }
