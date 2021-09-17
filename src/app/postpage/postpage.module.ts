import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostpagePageRoutingModule } from './postpage-routing.module';

import { PostpagePage } from './postpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostpagePageRoutingModule
  ],
  declarations: [PostpagePage]
})
export class PostpagePageModule {}
