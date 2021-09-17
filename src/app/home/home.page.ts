import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ObjectUnsubscribedError } from 'rxjs';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

// for everything
alldata: any
cleanoutput: any
finalcalls: number = 0
oldcalls: number = 0

// for getting duration at top
   duration: any = '';

// for getting user information
   doctorphoto: any = '../assets/doctor_pic.png';
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

   reviewcss: any = {"negcss": "col-4 active", "poscss": "col-4 inactive", "neucss": "col-4 inactive", "yourcss": "col-6 active", "comcss": "col-6 inactive", "callscss": "col-6 active", "locationcss": "col-6 inactive"};
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

   callsoutput: any = {}

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) {

   this.userid = JSON.parse(localStorage.getItem('userid'))

   if (localStorage.getItem('userid') == '{}'){
    this.router.navigate(['/login'])
   }

   this.data
       .geteverything(this.userid['id']).subscribe((res) => {
          this.alldata = res
          console.log(this.alldata)
          localStorage.setItem('alldata', JSON.stringify(res))
          this.getuserinfo(this.userid["id"])
          
       });

  }

  highcharts = Highcharts;
   chartOptions = {   
      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      subtitle:{
         text: '' 
      },
      xAxis:{
         categories: ['M','T','W','T','F','S','S'],
         crosshair: true        
      },     
      yAxis : {
         stackLabels: {
            style: {
                color: '#000',
                fontWeight: 'bold'
            },
            enabled: true,
            verticalAlign: 'top'
        },
         min: 0,
         title: {
            text: ''         
         }      
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.0f}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [{
         showInLegend: false,
         name: '',
         data: [10, 20, 30, 32, 28, 25, 20],
         color: '#7C3A85'
      }]
   };

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



   getreviews(){
      let reviewres: any
      console.log(this.alldata)
      reviewres = JSON.parse(this.alldata['reviews_json'])
      console.log(reviewres)
      // this.data
      //     .getreviews(function_name, email, loc).subscribe((reviewres) => {
            this.reviewsdata = reviewres
            console.log(this.reviewsdata['totalReviewCount'])
            console.log("This is reviews data")
             console.log(reviewres)

             for (let i = 0; i < reviewres['reviews'].length; i++){
                this.allreviews.push(reviewres['reviews']['comment'])
                if (this.getthedate()['olddate'].toISOString() < reviewres['reviews'][i]['updateTime']){
                     if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO"){
                     this.curreviews['negreviews'].push("" + reviewres['reviews'][i]['comment'])
                      }
                     else if(reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE"){
                        this.curreviews['posreviews'].push("" + reviewres['reviews'][i]['comment'])
                     }
                     else{
                        this.curreviews['neureviews'].push("" + reviewres['reviews'][i]['comment'])
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

      return reviewres
   // });

   }

   getmychips(){
      this.curreviews['compost'] = []
      console.log("Check this output")
      console.log(this.curreviews)
          
      this.data
      .getchips(this.curreviews).subscribe((revchips) => {
         this.mychips = revchips
         this.negchips = this.mychips['negchips']
         this.poschips = this.mychips['poschips']
         this.neuchips = this.mychips['neuchips']
         this.yourchips = this.mychips['yourchips']
         this.comchips = this.mychips['comchips']
         console.log(this.mychips)
         localStorage.setItem('chips', JSON.stringify(this.mychips))
         this.finalchips = this.mychips['negchips']

        // Object.keys(this.finalchips).forEach(element => {
        //    console.log(element)
        // });

      console.log("Check here")
          console.log(this.mychips['poschips'])
         this.finalposchips = this.mychips['yourchips']


      })
   }

   getposts(){
      // this.data
      //     .getposts(function_name, email, loc).subscribe((postres) => {
         let postres: any
         postres = JSON.parse(this.alldata['post_json'])
             console.log("This is posts data")
            console.log(postres)


            console.log(postres['localPosts'].length)
            for (let i = 0; i < postres['localPosts'].length; i++){
               if (this.getthedate()['olddate'].toISOString() < postres['localPosts'][i]['updateTime']){
                    this.posts['curpost'].push("" + postres['localPosts'][i]['summary'])
               }
               else if (this.getthedate()['previous'].toISOString() < postres['localPosts'][i]['updateTime']){
                    this.posts['oldpost'].push("" + postres['localPosts'][i]['summary'])
              }
           }
           console.log("Being displayed")
           console.log(this.posts)
           this.curreviews['yourpost'] = this.posts['curpost']
            return this.posts

         //  });
         }

   cleancallcount(response:any){
      let p: any
      let q: any
      var dict = [];
      var dict1 = [];
      
      for (var i = 0; i < response['locationMetrics'].length; i++) {
         for (var j = 0; j < response['locationMetrics'][i]['metricValues'].length; j++) {
              // console.log(response['locationMetrics'][i]['metricValues']);
              
              if (j == 0 && response['locationMetrics'][i]['metricValues'][j]['dimensionalValues']) {
                 for (var k = 0; k < response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'].length; k++) {

                      // console.log(response['locationMetrics'][i]['metricValues'][j]['dimensionalValues']);
                      p = response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'][k]['value']
                      // console.log(p)
                      q = response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'][k]['timeDimension']['dayOfWeek']
                      // console.log(response['locationMetrics'][0]['metricValues'][0]['totalValue']['value'])
                      if (q != null) {
                         dict.push({
                            'name': q,
                            'data': parseInt(p)
                         });
                      } else {
                         q = 0
                         dict.push({
                            'name': q,
                            'data': parseInt(p)
                         })
                      }

                  }
              } else if (j == 1 && response['locationMetrics'][i]['metricValues'][j]['dimensionalValues']) {
                 for (var k = 0; k < response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'].length; k++) {

                    p = response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'][k]['value']
                      // console.log(response['locationMetrics'][0]['metricValues'][0]['metric'])
                      q = response['locationMetrics'][i]['metricValues'][j]['dimensionalValues'][k]['timeDimension']['timeOfDay']['hours']
                      // console.log(response['locationMetrics'][0]['metricValues'][0]['totalValue']['value'])
                      if (q != null) {
                         dict1.push({
                            'name': q,
                            'data': parseInt(p)
                         });
                      } else {
                         q = 0
                         dict1.push({
                            'name': q,
                            'data': parseInt(p)
                         })
                      }

                  }
              }
              else{
                 var dictcall = [{name: "SUNDAY", data: 0},
                 {name: "MONDAY", data: 0},
                 {name: "TUESDAY", data: 0},
                 {name: "WEDNESDAY", data: 0},
                 {name: "THURSDAY", data: 0},
                 {name: "FRIDAY", data: 0},
                 {name: "SATURDAY", data: 0}]

                 var dicttime = [{name:0, data: 0},{name:0, data: 0},{name:0, data: 0},{name:0, data: 0}]
              }
          }
          // console.log(dict)
          // console.log(dict1);
          const sorter = {
"SUNDAY": 0, // << if sunday is first day of week
"MONDAY": 1,
"TUESDAY": 2,
"WEDNESDAY": 3,
"THURSDAY": 4,
"FRIDAY": 5,
"SATURDAY": 6,
//   "SUNDAY": 7
}
   }

   return dict

}


   getcalls(){
         let callres: any


         callres = JSON.parse(this.alldata['call_previous_json'])
         this.cleanoutput = this.cleancallcount(callres)
         console.log(this.cleanoutput)
               
               for (let i= 0; i< this.cleanoutput.length; i++){
                  console.log(this.cleanoutput[i]['data'])
                  this.oldcalls = this.oldcalls + this.cleanoutput[i]['data']
               }


         callres = JSON.parse(this.alldata['call_json'])
         console.log("This is calls data")
         console.log(callres)
         this.cleanoutput = this.cleancallcount(callres)
         console.log(this.cleanoutput)
               
               for (let i= 0; i< this.cleanoutput.length; i++){
                  console.log(this.cleanoutput[i]['data'])
                  this.finalcalls = this.finalcalls + this.cleanoutput[i]['data']
               }




            return callres

         }         


// function of functions called second in thread
   getdetail(useridoutput: any){
      this.reviewsoutput = this.getreviews()
      this.callsoutput = this.getcalls()
      console.log(this.callsoutput)
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

      this.finalchips = {"No text!": ""}
      this.finalposchips = {"No text!": ""}

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



      }


      negreviews(){
         // console.log("Neg reviews clicked")
         this.reviewcss['negcss'] = 'col-4 active'
         this.reviewcss['poscss'] = 'col-4 inactive'
         this.reviewcss['neucss'] = 'col-4 inactive'
         this.finalchips = this.mychips['negchips']
      }
   
      neureviews(){
         // console.log("Neu reviews clicked")
         this.reviewcss['negcss'] = 'col-4 inactive'
         this.reviewcss['poscss'] = 'col-4 inactive'
         this.reviewcss['neucss'] = 'col-4 active'
         this.finalchips = this.mychips['neuchips']
      }
   
      posreviews(){
         // console.log("Pos reviews clicked")
         this.reviewcss['negcss'] = 'col-4 inactive'
         this.reviewcss['poscss'] = 'col-4 active'
         this.reviewcss['neucss'] = 'col-4 inactive'
         this.finalchips = this.mychips['poschips']
      }

      yourpost(){
         // console.log("Neu reviews clicked")
         this.reviewcss['yourcss'] = 'col-6 active'
         this.reviewcss['comcss'] = 'col-6 inactive'
         this.finalposchips = this.mychips['yourchips']
      }
   
      compost(){
         // console.log("Pos reviews clicked")
         this.reviewcss['yourcss'] = 'col-6 inactive'
         this.reviewcss['comcss'] = 'col-6 active'
         this.finalposchips = this.mychips['comchips']
      }

      calls(){
         // console.log("Pos reviews clicked")
         this.reviewcss['locationcss'] = 'col-6 inactive'
         this.reviewcss['callscss'] = 'col-6 active'
      }
      location(){
         // console.log("Pos reviews clicked")
         this.reviewcss['callscss'] = 'col-6 inactive'
         this.reviewcss['locationcss'] = 'col-6 active'
      }
     


   }