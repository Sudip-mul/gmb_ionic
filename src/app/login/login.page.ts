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

  constructor(private route: Router) { }



  sendCode(){
    console.log(this.code)
    this.route.navigateByUrl('/redirect?id='+this.code)
  }


  ngOnInit() {


  }

}
