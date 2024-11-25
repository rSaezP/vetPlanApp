import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetHomePageRoutingModule } from './vet-home-routing.module';

import { VetHomePage } from './vet-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VetHomePageRoutingModule
  ],
  declarations: [VetHomePage]
})
export class VetHomePageModule {}
