import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { NgProgressModule } from 'ngx-progressbar';

//import { Camera, CameraResultType, CameraSource, ImageOptions } from "@capacitor/camera";

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgProgressModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
