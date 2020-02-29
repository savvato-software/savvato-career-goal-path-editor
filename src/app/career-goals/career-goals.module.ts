import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerGoalsPageRoutingModule } from './career-goals-routing.module';

import { CareerGoalsPage } from './career-goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerGoalsPageRoutingModule
  ],
  declarations: [CareerGoalsPage]
})
export class CareerGoalsPageModule {}
