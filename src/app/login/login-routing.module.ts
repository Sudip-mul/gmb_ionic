import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
