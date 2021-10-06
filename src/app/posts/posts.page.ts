import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ObjectUnsubscribedError } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {// for getting duration at top
alldata: any
// for getting duration at top
duration: any = '';

// for getting user information
   doctorphoto: any = './assets/doctor_pic.png';
   userid: any;
   useridoutput: any;
   userinfo: any;

// for getting reviews information 
   email: any
   loc: any
   reviewsoutput: any

// for reviews section
   reviewsdata: any;

   curreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': [], 'yourpost': [], 'compost': ['Great post on Covid-19', 'Eexcellent output of your post', 'Some decent post to look at after some time']}
   oldreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': []}

   reviewcss: any = {"negcss": "col-4 active", "poscss": "col-4 inactive", "neucss": "col-4 inactive", "yourcss": "col-6 active", "comcss": "col-6 inactive"};
   finalchips: any = 'No reviews'
   finalposchips: any = 'No reviews'


   usethispost: any


   allreviews: any = [];

// Across chips
   mychips: any
   negchips: any
   poschips: any
   neuchips: any
   yourchips: any
   comchips: any

// For posts
   posts: any = {"curpost": [], "oldpost": [], "compost": [], "comoldpost": []}
   postsoutput: any = {}
   finalposts: any

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) {

   this.userid = JSON.parse(localStorage.getItem('userid'))

   if (localStorage.getItem('userid') == '{}'){
    this.router.navigate(['/login'])
   }

   this.alldata = localStorage.getItem('alldata')
   this.alldata = JSON.parse(this.alldata)

   this.mychips = localStorage.getItem('chips')
   this.mychips = JSON.parse(this.mychips)

  }

   getthedate(){
      let days = 30; // Days you want to subtract
      let date = new Date();
      let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
      let previous = new Date(last.getTime() - (days * 24 * 60 * 60 * 1000));
      let day = last.getDate() + " " + last.toLocaleString('en-us', { month: 'short' }) + " - " + date.getDate() + " " + date.toLocaleString('en-us', { month: 'short' });
      return {"duration": day, "olddate": last, "previous": previous}
   }


   valueOrder = (
      a: KeyValue<number, string>,
      b: KeyValue<number, string>
    ): number => {
      return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
    };




    getmychips(){
      this.curreviews['compost'] = []
         this.negchips = this.mychips['negchips']
         this.poschips = this.mychips['poschips']
         this.neuchips = this.mychips['neuchips']
         this.yourchips = this.mychips['yourchips']
         this.comchips = this.mychips['comchips']
         localStorage.setItem('chips', JSON.stringify(this.mychips))
         this.finalchips = this.mychips['negchips']


        // Object.keys(this.finalchips).forEach(element => {
        //    console.log(element)
        // });

         this.finalposchips = this.mychips['yourchips']

   }
    

   getposts(){
      // this.data
      //     .getposts(function_name, email, loc).subscribe((postres) => {
         let postres: any
         postres = JSON.parse(this.alldata['post_json'])

            for (let i = 0; i < postres['localPosts'].length; i++){
               if (this.getthedate()['olddate'].toISOString() < postres['localPosts'][i]['updateTime']){
                    this.posts['curpost'].push({"id": postres['localPosts'][i]['name'], "image": postres['localPosts'][i]['media'][0]['googleUrl']})
               }
               else if (this.getthedate()['previous'].toISOString() < postres['localPosts'][i]['updateTime']){
                    this.posts['oldpost'].push({"id": postres['localPosts'][i]['name'],  "image": postres['localPosts'][i]['media'][0]['googleUrl']})
              }
           }



           postres = JSON.parse(this.alldata['comppost_json'])


           for (let i = 0; i < postres['localPosts'].length; i++){
            if (this.getthedate()['olddate'].toISOString() < postres['localPosts'][i]['updateTime']){
                 this.posts['compost'].push({"id": postres['localPosts'][i]['name'], "image": postres['localPosts'][i]['media'][0]['googleUrl']})
            }
            else if (this.getthedate()['previous'].toISOString() < postres['localPosts'][i]['updateTime']){
                 this.posts['comoldpost'].push({"id": postres['localPosts'][i]['name'],  "image": postres['localPosts'][i]['media'][0]['googleUrl']})
           }
        }
           this.curreviews['compost'] = this.posts['compost']




           this.curreviews['yourpost'] = this.posts['curpost']
            return this.posts

         //  });
         }


// function of functions called second in thread
   getdetail(useridoutput: any){
      this.postsoutput = this.getposts()
      this.getmychips()
   }


// Latest item called on Init
   getuserinfo(userid: any){
      this.data
         .getuserinfo(userid).subscribe((userres) => {
            // console.log("This is user data")
            //  console.log(userres)
            localStorage.setItem('userdata', JSON.stringify(userres))
            this.getdetail(userres)
   });
   }





   ngOnInit(): void{
      // console.log("Working")

      this.finalchips = {"No reviews!": ""}
      this.finalposchips = {"No posts!": ""}

      this.duration = this.getthedate()['duration']
      // console.log(this.duration)


      // this.route.queryParams.subscribe(params => {
      //    if (params) {
      //    //   let queryParams = JSON.parse(params);
      //    //   console.log(params)
      //      this.userid = params
      //      this.getuserinfo(this.userid["id"])
         
      // }
      //  });

      this.getuserinfo(this.userid["id"])

      this.yourpost()

      }


      yourpost(){
         // console.log("Neu reviews clicked")
         this.reviewcss['yourcss'] = 'col-6 active'
         this.reviewcss['comcss'] = 'col-6 inactive'
         this.finalposchips = this.mychips['yourchips']
         this.finalposts = this.posts.curpost
         console.log(this.finalposts)
         this.usethispost =  'post_json'
      }
   
      compost(){
         // console.log("Pos reviews clicked")
         this.reviewcss['yourcss'] = 'col-6 inactive'
         this.reviewcss['comcss'] = 'col-6 active'
         this.finalposchips = this.mychips['comchips']
         this.finalposts = this.posts.compost
         console.log(this.finalposts)
         this.usethispost =  'comppost_json'         
      }

      
      monthlyreport(){
         this.router.navigate(['/monthlyreport'])        
     }



   }