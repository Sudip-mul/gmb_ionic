import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    private router: Router,
    ) { }
  canActivate(route,state:RouterStateSnapshot) {

  //   if(localStorage.getItem('userid') !==null && localStorage.getItem('userid') != '{}'){
  //     this.router.navigateByUrl('/redirect?id='+ JSON.parse(localStorage.getItem('userid')['id']))
  //   }
  // else{
  //   this.router.navigateByUrl('/login')
   
  // }
return true
    
  
  }
}
