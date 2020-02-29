import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboursPageRoutingModule } from './labours-routing.module';

import { LaboursPage } from './labours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboursPageRoutingModule
  ],
  declarations: [LaboursPage]
})
export class LaboursPageModule {}
