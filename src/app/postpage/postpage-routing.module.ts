import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostpagePage } from './postpage.page';

const routes: Routes = [
  {
    path: '',
    component: PostpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostpagePageRoutingModule {}
