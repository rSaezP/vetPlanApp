import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserHomePageRoutingModule } from './user-home-routing.module';
import { UserHomePage } from './user-home.page';
import { EditarMascotaModalModule } from '../../components/editar-mascota-modal/editar-mascota-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule,
    EditarMascotaModalModule
  ],
  declarations: [UserHomePage]
})
export class UserHomePageModule {}