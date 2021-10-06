import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
  code: any
  err = false

  data: any = 'Enter code'

  constructor(private route: Router) {

   }


   ionViewWillEnter(){
    console.log("ionViewWillEnter")
    this.ngOnInit()
}


  sendCode(){
    console.log(this.code)
    this.route.navigateByUrl('/redirect?id='+this.code)
  }


  ngOnInit() {

    console.log("Constructor executes every time")
    this.data = localStorage.getItem('userid')

  if (localStorage.getItem('userid') == null) {
      console.log('User is not logged in yet')
  }
  else{
    if(JSON.parse(localStorage.getItem('userid')).hasOwnProperty('id')){
      this.route.navigateByUrl('/home')
      console.log(JSON.parse(localStorage.getItem('userid'))['id'])
      console.log("Login redirect works")
    }else{
      console.log('User is not logged in yet')
    }
   

  }


  //   if (localStorage.getItem('userid') === null) {
  //     console.log('User is not logged in yet')
  // }
  // else{
  //   this.route.navigateByUrl('/redirect?id='+JSON.parse(localStorage.getItem('userid'))['id'])
  //   console.log(JSON.parse(localStorage.getItem('userid'))['id'])
  //   console.log("Login redirect works")

  // }

  }

}
