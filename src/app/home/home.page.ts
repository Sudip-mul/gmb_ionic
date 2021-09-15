import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

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

   curreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': []}
   oldreviews: any = {'negreviews': [], 'neureviews': [], 'posreviews': []}

   allreviews: any = [];


  constructor(private route: ActivatedRoute, private data: DataService) {}

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

   getdetail(useridoutput: any){
      this.reviewsoutput = this.getreviews("onlyvreviews", useridoutput['Google email'], useridoutput['account'])

   }

     getuserinfo(userid: any){
       this.data
          .getuserinfo(userid).subscribe((userres) => {
            // console.log("This is user data")
            //  console.log(userres)
             localStorage.setItem('userdata', JSON.stringify(userres))
             this.getdetail(userres)
   });

   }

   getreviews(function_name: any, email: any, loc: any){
      this.data
          .getreviews(function_name, email, loc).subscribe((reviewres) => {
            this.reviewsdata = reviewres
            console.log(this.reviewsdata['totalReviewCount'])
            console.log("This is reviews data")
             console.log(reviewres)

             for (let i = 0; i < reviewres['reviews'].length; i++){
                this.allreviews.push(reviewres['reviews']['comment'])
                if (this.getthedate()['olddate'].toISOString() < reviewres['reviews'][i]['updateTime']){
                     if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO"){
                     this.curreviews['negreviews'].push(reviewres['reviews'][i]['comment'])
                      }
                     else if(reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE"){
                        this.curreviews['posreviews'].push(reviewres['reviews'][i]['comment'])
                     }
                     else{
                        this.curreviews['neureviews'].push(reviewres['reviews'][i]['comment'])
                     }
                }
                else if (this.getthedate()['previous'].toISOString() < reviewres['reviews'][i]['updateTime']){
                     if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO"){
                     this.oldreviews['negreviews'].push(reviewres['reviews'][i]['comment'])
                     }
                     else if(reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE"){
                     this.oldreviews['posreviews'].push(reviewres['reviews'][i]['comment'])
                     }
                     else{
                     this.oldreviews['neureviews'].push(reviewres['reviews'][i]['comment'])
                     }
               }
            }

             console.log("Check this output")
             console.log(this.oldreviews)

             this.data
             .getchips(this.oldreviews['negreviews'] + this.oldreviews['posreviews'] + this.oldreviews['neureviews']).subscribe((revchips) => {
                console.log(revchips)

             })

      return reviewres
   });

   }




   ngOnInit(): void{
      console.log("Working")

      this.duration = this.getthedate()['duration']
      console.log(this.duration)


      this.route.queryParams.subscribe(params => {
         if (params) {
         //   let queryParams = JSON.parse(params);
           console.log(params)
           this.userid = params
           this.getuserinfo(this.userid["id"])
         
      }
       });
      }


   }