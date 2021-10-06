import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.page.html',
  styleUrls: ['./postpage.page.scss'],
})
export class PostpagePage implements OnInit {
  alldata: any
  postarea: any
  displaythis: any

  doctorphoto: any = './assets/doctor_pic.png';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.alldata = JSON.parse(localStorage.getItem("alldata"))
    // this.postarea = JSON.parse(this.alldata['post_json'])

    
          this.route.queryParams.subscribe(params => {
         if (params) {

          console.log("Display this text")
          console.log(params.file)
          this.postarea = JSON.parse(this.alldata[params.file])
          console.log(this.postarea)
           for (let i = 0; i < this.postarea['localPosts'].length; i++){
             console.log(params.id)
             if (this.postarea['localPosts'][i]['name'] == params.id){
              this.displaythis = this.postarea['localPosts'][i]
              console.log(this.displaythis)

             }

           }

         //   let queryParams = JSON.parse(params);
         //   console.log(params)
         
      }
       });
  }

  
  monthlyreport(){
    this.router.navigate(['/monthlyreport'])        
}


}
