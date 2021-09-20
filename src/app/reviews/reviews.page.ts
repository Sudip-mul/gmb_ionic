import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ObjectUnsubscribedError } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

// for everything
   alldata: any

// for getting duration at top
duration: any = '';

// user data is in this from localstorage
userdata: any;

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
   displayreviews: any;

   curreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': [], 'yourpost': [], 'compost': ['Great post on Covid-19', 'Eexcellent output of your post', 'Some decent post to look at after some time']}
   oldreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': []}

   reviewcss: any = {"negcss": "col-4 active", "poscss": "col-4 inactive", "neucss": "col-4 inactive", "yourcss": "col-6 active", "comcss": "col-6 inactive"};
   finalchips: any = 'No reviews'
   finalposchips: any = 'No reviews'



   allreviews: any = [];

// Across chips
   mychips: any
   negchips: any
   poschips: any
   neuchips: any
   yourchips: any
   comchips: any


// For posts
   posts: any = {"curpost": [], "oldpost": [], "compost": 18, "comoldpost": 12}
   postsoutput: any = {}

  constructor(private data: DataService) {
    this.userdata = localStorage.getItem('userdata')
    this.userdata = JSON.parse(this.userdata)

    this.alldata = localStorage.getItem('alldata')
    this.alldata = JSON.parse(this.alldata)
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


    getstarcount(startext: any){
       if (startext == 'ONE'){
          return {"active": 1, "inactive": 4}
       }
       else if (startext == 'TWO'){
         return {"active": 2, "inactive": 3}
      }
      else if (startext == 'THREE'){
         return {"active": 3, "inactive": 2}
      }
      else if (startext == 'FOUR'){
         return {"active": 4, "inactive": 1}
      }
      else if (startext == 'FIVE'){
         return {"active": 5, "inactive": 0}
      }

    }

   getreviews(){
      // this.data
      //     .getreviews(function_name, email, loc).subscribe((reviewres) => {
         let reviewres: any
         reviewres = JSON.parse(this.alldata['reviews_json'])
            this.reviewsdata = reviewres
            console.log(this.reviewsdata['totalReviewCount'])
            console.log("This is reviews data")
             console.log(reviewres)

             for (let i = 0; i < reviewres['reviews'].length; i++){
                this.allreviews.push(reviewres['reviews']['comment'])
                if (this.getthedate()['olddate'].toISOString() < reviewres['reviews'][i]['updateTime']){
                     if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO"){
                     this.curreviews['negreviews'].push({"reviewtext": reviewres['reviews'][i]['comment'], "dispname": reviewres['reviews'][i]['reviewer']['displayName'], "dispurl": reviewres['reviews'][i]['reviewer']['profilePhotoUrl'], "stars": this.getstarcount(reviewres['reviews'][i]['starRating']), "revdate": reviewres['reviews'][i]['updateTime']})
                      }
                     else if(reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE"){
                        this.curreviews['posreviews'].push({"reviewtext": reviewres['reviews'][i]['comment'], "dispname": reviewres['reviews'][i]['reviewer']['displayName'], "dispurl": reviewres['reviews'][i]['reviewer']['profilePhotoUrl'], "stars": this.getstarcount(reviewres['reviews'][i]['starRating']), "revdate": reviewres['reviews'][i]['updateTime']})
                     }
                     else{
                        this.curreviews['neureviews'].push({"reviewtext": reviewres['reviews'][i]['comment'], "dispname": reviewres['reviews'][i]['reviewer']['displayName'], "dispurl": reviewres['reviews'][i]['reviewer']['profilePhotoUrl'], "stars": this.getstarcount(reviewres['reviews'][i]['starRating']), "revdate": reviewres['reviews'][i]['updateTime']})
                     }
                }
                else if (this.getthedate()['previous'].toISOString() < reviewres['reviews'][i]['updateTime']){
                     if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO"){
                     this.oldreviews['negreviews'].push("" + reviewres['reviews'][i]['comment'])
                     }
                     else if(reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE"){
                     this.oldreviews['posreviews'].push("" + reviewres['reviews'][i]['comment'])
                     }
                     else{
                     this.oldreviews['neureviews'].push("" + reviewres['reviews'][i]['comment'])
                     }
               }
            }

            //  if(this.oldreviews['negreviews'] != null || this.oldreviews['posreviews'] || this.oldreviews['neureviews']){

            //  this.curreviews['yourpost'] = []
             this.curreviews['compost'] = []
             console.log("Check this output")
             console.log(this.curreviews)

             this.mychips = JSON.parse(localStorage.getItem('chips'))
                 
                this.finalchips = this.mychips['negchips']

                 console.log(this.finalchips)
                this.finalposchips = this.mychips['yourchips']

                this.negreviews()

      return reviewres
   // });

   }


// function of functions called second in thread
   getdetail(useridoutput: any){
     console.log(useridoutput)
      this.reviewsoutput = this.getreviews()

   }




   ngOnInit(): void{
      // console.log("Working")

      this.finalchips = {"No text!": ""}
      // this.finalposchips = {"No posts!": ""}

      this.duration = this.getthedate()['duration']
      // console.log(this.duration)


      console.log(this.userdata)
      this.getdetail(this.userdata)
      }


      negreviews(){
         // console.log("Neg reviews clicked")
         this.reviewcss['negcss'] = 'col-4 active'
         this.reviewcss['poscss'] = 'col-4 inactive'
         this.reviewcss['neucss'] = 'col-4 inactive'
         this.finalchips = this.mychips['negchips']
         // console.log(this.displayreviews)
         this.displayreviews = this.curreviews['negreviews']
      }
   
      neureviews(){
         // console.log("Neu reviews clicked")
         this.reviewcss['negcss'] = 'col-4 inactive'
         this.reviewcss['poscss'] = 'col-4 inactive'
         this.reviewcss['neucss'] = 'col-4 active'
         this.finalchips = this.mychips['neuchips']
         this.displayreviews = this.curreviews['neureviews']
      }
   
      posreviews(){
         // console.log("Pos reviews clicked")
         this.reviewcss['negcss'] = 'col-4 inactive'
         this.reviewcss['poscss'] = 'col-4 active'
         this.reviewcss['neucss'] = 'col-4 inactive'
         this.finalchips = this.mychips['poschips']
         this.displayreviews = this.curreviews['posreviews']
      }


   }