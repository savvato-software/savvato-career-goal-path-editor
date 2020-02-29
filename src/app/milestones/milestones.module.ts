import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MilestonesPageRoutingModule } from './milestones-routing.module';

import { MilestonesPage } from './milestones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MilestonesPageRoutingModule
  ],
  declarations: [MilestonesPage]
})
export class MilestonesPageModule {}
