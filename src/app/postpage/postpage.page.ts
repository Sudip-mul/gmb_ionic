import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.page.html',
  styleUrls: ['./postpage.page.scss'],
})
export class PostpagePage implements OnInit {
  alldata: any
  postarea: any
  displaythis: any

  doctorphoto: any = '../assets/doctor_pic.png';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.alldata = JSON.parse(localStorage.getItem("alldata"))
    this.postarea = JSON.parse(this.alldata['post_json'])

    
          this.route.queryParams.subscribe(params => {
         if (params) {
           console.log(params)

           for (let i = 0; i < this.postarea['localPosts'].length; i++){
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

}
