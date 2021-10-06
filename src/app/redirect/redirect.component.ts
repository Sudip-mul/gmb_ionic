import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
userid: any;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
      //   let queryParams = JSON.parse(params);
      if(params.hasOwnProperty('id')){
        console.log(JSON.stringify(params))
      localStorage.setItem('userid', JSON.stringify(params)) 
      this.router.navigate(['/home'])
    }
    else{
      this.router.navigate(['/login'])
    }
      
   }
   else{
    this.router.navigate(['/login'])
  }



    });
  }

}
