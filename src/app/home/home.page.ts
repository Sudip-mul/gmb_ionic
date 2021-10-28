import { KeyValue } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

import { DataService } from '../services/data.service';
import {interval} from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {



    // for everything
    alldata: any
    cleanoutput: any
    cleansearchouput: any
    finalcalls: number = 0
    oldcalls: number = 0
    finalsearch: number = 0
    oldsearch: number = 0

    forgraph: any = { "labels": ["Not available"], "data": [100] }


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

    curreviews: any = { 'negreviews': [], 'neureviews': [], 'posreviews': [], 'yourpost': [], 'compost': ['Great post on Covid-19', 'Excellent output of your post', 'Some decent post to look at after some time'] }
    oldreviews: any = { 'negreviews': [], 'neureviews': [], 'posreviews': [] }

    reviewcss: any = { "negcss": "col-4 active", "poscss": "col-4 inactive", "neucss": "col-4 inactive", "yourcss": "col-6 active", "comcss": "col-6 inactive", "callscss": "col-6 active", "locationcss": "col-6 inactive" };
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
    posts: any = { "curpost": [], "oldpost": [], "compost": [], "comoldpost": [] }
    postsoutput: any = {}

    callsoutput: any = {}
    // chart:any
    searchoutput: any = {}
    docname: any = "Please check the internet!"

    reportcss: any = 'reportarea purpletext mb-0';

    constructor(private route: ActivatedRoute, private router: Router, private data: DataService) {

            // interval(1200).subscribe(() => {
            //     let colors = ['reportarea purpletext mb-0', 'reportarea redtext mb-0']
            //     console.log("execute after 2 seconds")
            //     // console.log("This is i: " + i)
            //     console.log(colors[Math.floor((Math.random()*colors.length))])
            //    this.reportcss =  colors[Math.floor((Math.random()*colors.length))];
            // });

            
            let counter = 0
            interval(1200).subscribe(() => {
                let colors = ['reportarea purpletext mb-0', 'reportareared redtext mb-0']
                if (counter == 20){
                    counter = 0
                }
                else {
                    if (counter % 2 == 0){ 
                   this.reportcss =  colors[0];
                }
                else{
                    this.reportcss =  colors[1];
                }
                counter += 1;
                }

            });



    }

    ionViewWillEnter(){
        if (localStorage.getItem('userid') == null || localStorage.getItem('userid') == '{}'){
            this.router.navigateByUrl('/login')
        }

        this.userid = JSON.parse(localStorage.getItem('userid'))
        this.data
            .geteverything(this.userid['id']).subscribe((res) => {
                this.alldata = res
                console.log("Madhu")
                console.log(this.alldata)
                // if (this.alldata == null) {
                //     this.router.navigate(['/login'])
                // }

                localStorage.setItem('alldata', JSON.stringify(res))
                this.getuserinfo(this.userid["id"])

            });
    }

    getChart() {
       
        // highcharts = Highcharts;
        Highcharts.chart('barChart', {
         chart: {
           type: 'column',
           width: 350
         },
         title: {
           text: ''
         },
         xAxis: {
            categories: this.forgraph['labels'],
                      crosshair: true },
         yAxis: {
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
   
         tooltip: {
                      headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
                      pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style = "padding:0"><b>{point.y:.0f}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
                  },
                  plotOptions: {
                      column: {
                          pointPadding: 0.2,
                          borderWidth: 0
                      },
                      series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                  },
         credits: {
           enabled: false
         },
         series: [
           {
             type: undefined,
             name: '',
                       data: this.forgraph['data'],
                       color: '#7C3A85'
   
   
           }
         ],   
          responsive: {
            rules: [{
                condition: {
                    maxWidth: 350
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
         }
   
       });
   
      //   Highcharts.chart('barChart', {
      //       chart: {
      //           type: 'column'
      //       },
      //       title: {
      //           text: ''
      //       },
      //       subtitle: {
      //           text: ''
      //       },
      //       xAxis: {
      //           categories: this.forgraph['labels'],
      //           crosshair: true
      //       },
      //       yAxis: {
      //           stackLabels: {
      //               style: {
      //                   color: '#000',
      //                   fontWeight: 'bold'
      //               },
      //               enabled: true,
      //               verticalAlign: 'top'
      //           },
      //           min: 0,
      //           title: {
      //               text: ''
      //           }
      //       },
      //       tooltip: {
      //           headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
      //           pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
      //               '<td style = "padding:0"><b>{point.y:.0f}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      //       },
      //       plotOptions: {
      //           column: {
      //               pointPadding: 0.2,
      //               borderWidth: 0
      //           }
      //       },
      //       series: [{
      //           showInLegend: false,
      //           name: '',
      //           data: this.forgraph['data'],
      //           color: '#7C3A85'
      //       }]
      //   });


    }


    //   chartOptions = {
    //    highcharts.chart('barChart',{

    //      chart: {
    //         type: 'column'
    //      },
    //      title: {
    //         text: ''
    //      },
    //      subtitle:{
    //         text: '' 
    //      },
    //      xAxis:{
    //         categories: this.forgraph['labels'],
    //         crosshair: true        
    //      },     
    //      yAxis : {
    //         stackLabels: {
    //            style: {
    //                color: '#000',
    //                fontWeight: 'bold'
    //            },
    //            enabled: true,
    //            verticalAlign: 'top'
    //        },
    //         min: 0,
    //         title: {
    //            text: ''         
    //         }      
    //      },
    //      tooltip : {
    //         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
    //         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
    //            '<td style = "padding:0"><b>{point.y:.0f}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
    //      },
    //      plotOptions : {
    //         column: {
    //            pointPadding: 0.2,
    //            borderWidth: 0
    //         }
    //      },
    //      series: [{
    //         showInLegend: false,
    //         name: '',
    //         data: this.forgraph['data'],
    //         color: '#7C3A85'
    //      }]
    //   };


    getthedate() {
        let days = 30; // Days you want to subtract
        let date = new Date();
        let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        let previous = new Date(last.getTime() - (days * 24 * 60 * 60 * 1000));
        let day = last.getDate() + " " + last.toLocaleString('en-us', { month: 'short' }) + " - " + date.getDate() + " " + date.toLocaleString('en-us', { month: 'short' });
        return { "duration": day, "olddate": last, "previous": previous }
    }


    valueOrder = (
        a: KeyValue<number, string>,
        b: KeyValue<number, string>
    ): number => {
        return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
    };



    getreviews() {
        let reviewres: any
        console.log(this.alldata)
        try{
            reviewres = JSON.parse(this.alldata['reviews_json'])
        }
        catch(r){
            console.log(r)
        }
        console.log(reviewres)
        // this.data
        //     .getreviews(function_name, email, loc).subscribe((reviewres) => {
        this.reviewsdata = reviewres
        console.log(this.reviewsdata['totalReviewCount'])
        console.log("This is reviews data")
        console.log(reviewres)
        

        for (let i = 0; i < reviewres['reviews'].length; i++) {
            this.allreviews.push(reviewres['reviews']['comment'])
            if (this.getthedate()['olddate'].toISOString() < reviewres['reviews'][i]['updateTime']) {
                if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO") {
                    this.curreviews['negreviews'].push("" + reviewres['reviews'][i]['comment'])
                }
                else if (reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE") {
                    this.curreviews['posreviews'].push("" + reviewres['reviews'][i]['comment'])
                }
                else {
                    this.curreviews['neureviews'].push("" + reviewres['reviews'][i]['comment'])
                }
            }
            else if (this.getthedate()['previous'].toISOString() < reviewres['reviews'][i]['updateTime']) {
                if (reviewres['reviews'][i]['starRating'] == "ONE" || reviewres['reviews'][i]['starRating'] == "TWO") {
                    this.oldreviews['negreviews'].push("" + reviewres['reviews'][i]['comment'])
                }
                else if (reviewres['reviews'][i]['starRating'] == "FOUR" || reviewres['reviews'][i]['starRating'] == "FIVE") {
                    this.oldreviews['posreviews'].push("" + reviewres['reviews'][i]['comment'])
                }
                else {
                    this.oldreviews['neureviews'].push("" + reviewres['reviews'][i]['comment'])
                }
            }
        }

        //  if(this.oldreviews['negreviews'] != null || this.oldreviews['posreviews'] || this.oldreviews['neureviews']){

        //  this.curreviews['yourpost'] = []

        return reviewres
        // });

    }

    getmychips() {
        // this.curreviews['compost'] = []
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

    getposts() {
        // this.data
        //     .getposts(function_name, email, loc).subscribe((postres) => {
        let postres: any
        postres = JSON.parse(this.alldata['post_json'])
        console.log("This is posts data")
        console.log(postres)


        console.log(postres['localPosts'].length)
        for (let i = 0; i < postres['localPosts'].length; i++) {
            if (this.getthedate()['olddate'].toISOString() < postres['localPosts'][i]['updateTime']) {
                this.posts['curpost'].push("" + postres['localPosts'][i]['summary'])
            }
            else if (this.getthedate()['previous'].toISOString() < postres['localPosts'][i]['updateTime']) {
                this.posts['oldpost'].push("" + postres['localPosts'][i]['summary'])
            }
        }
        console.log("Being displayed")
        console.log(this.posts)
        this.curreviews['yourpost'] = this.posts['curpost']




        postres = JSON.parse(this.alldata['comppost_json'])
        console.log("This is posts data")
        console.log(postres)


        console.log(postres['localPosts'].length)
        for (let i = 0; i < postres['localPosts'].length; i++) {
            if (this.getthedate()['olddate'].toISOString() < postres['localPosts'][i]['updateTime']) {
                this.posts['compost'].push("" + postres['localPosts'][i]['summary'])
            }
            else if (this.getthedate()['previous'].toISOString() < postres['localPosts'][i]['updateTime']) {
                this.posts['comoldpost'].push("" + postres['localPosts'][i]['summary'])
            }
        }
        console.log("Being displayed")
        console.log(this.posts)
        this.curreviews['compost'] = this.posts['compost']





        return this.posts

        //  });
    }

    cleansearchcount(response: any) {
        var p: any;
        var q: any;
        var r: any;
        var dict = [];
        for (var i = 0; i < response['locationMetrics'].length; i++) {
            for (var j = 0; j < response['locationMetrics'][i]['metricValues'].length; j++) {
                p = response['locationMetrics'][i]['metricValues'][j]['metric']
                // console.log(response['locationMetrics'][0]['metricValues'][0]['metric'])
                q = response['locationMetrics'][i]['metricValues'][j]['totalValue']['value']
                r = response['locationMetrics'][i]['metricValues'][j]['totalValue']['timeDimension']['timeRange']['startTime'].split('T')[0]
                // console.log(r)
                // console.log(response['locationMetrics'][0]['metricValues'][0]['totalValue']['value'])
                if (p != null) {
                    dict.push({
                        'name': p,
                        'data': parseInt(q)
                    });
                } else {
                    p = 'none'
                    dict.push({
                        'name': p,
                        'data': q.split(" ")
                    })
                }
                var dict1 = [];
                var dict2 = [];
                var dict3 = [];
                var dict4 = [];
                Object.keys(dict).forEach(function (a) {
                    if (dict[a].name == 'ACTIONS_WEBSITE' || dict[a].name == 'ACTIONS_PHONE' || dict[a].name == 'ACTIONS_DRIVING_DIRECTIONS') {
                        dict1.push({
                            'name': dict[a].name,
                            'data': dict[a].data
                        })
                    } else if (dict[a].name == 'VIEWS_MAPS' || dict[a].name == 'VIEWS_SEARCH') {
                        dict2.push({
                            'name': dict[a].name,
                            'data': dict[a].data
                        })
                    } else if (dict[a].name == 'PHOTOS_VIEWS_MERCHANT' || dict[a].name == 'PHOTOS_VIEWS_CUSTOMERS') {
                        dict3.push({
                            'name': dict[a].name,
                            'data': dict[a].data
                        })
                    } else if (dict[a].name == 'QUERIES_DIRECT' || dict[a].name == 'QUERIES_INDIRECT' || dict[a].name == 'QUERIES_CHAIN') {
                        dict4.push({
                            'name': dict[a].name,
                            'data': dict[a].data
                        })
                    }
                    // console.log(x);
                    // console.log(y);
                })
            }
        }

        return dict4;
    }

    cleancallcount(response: any) {
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
                else {
                    var dictcall = [{ name: "SUNDAY", data: 0 },
                    { name: "MONDAY", data: 0 },
                    { name: "TUESDAY", data: 0 },
                    { name: "WEDNESDAY", data: 0 },
                    { name: "THURSDAY", data: 0 },
                    { name: "FRIDAY", data: 0 },
                    { name: "SATURDAY", data: 0 }]

                    var dicttime = [{ name: 0, data: 0 }, { name: 0, data: 0 }, { name: 0, data: 0 }, { name: 0, data: 0 }]
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

    getsearches() {
        let searchres: any;

        searchres = JSON.parse(this.alldata['search_previous_json'])
        this.cleansearchouput = this.cleansearchcount(searchres)
        console.log(this.cleansearchouput)

        for (let i = 0; i < this.cleansearchouput.length; i++) {
            console.log(this.cleansearchouput[i]['data'])
            this.oldsearch = this.oldsearch + this.cleansearchouput[i]['data']
        }


        searchres = JSON.parse(this.alldata['search_json'])
        console.log("This is search data")
        console.log(searchres)
        this.cleansearchouput = this.cleansearchcount(searchres)
        console.log(this.cleansearchouput)

        for (let i = 0; i < this.cleansearchouput.length; i++) {
            console.log(this.cleansearchouput[i]['data'])
            this.finalsearch = this.finalsearch + this.cleansearchouput[i]['data']
        }




        return searchres
    }

    forsorting(dict: any) {

        var sorter = {
            "SUNDAY": 0, // << if sunday is first day of week
            "MONDAY": 1,
            "TUESDAY": 2,
            "WEDNESDAY": 3,
            "THURSDAY": 4,
            "FRIDAY": 5,
            "SATURDAY": 6,
            //   "SUNDAY": 7
        }


        dict.sort(function sortByDay(a, b) {
            let day1 = a.name;
            let day2 = b.name;
            return sorter[day1] - sorter[day2];
        });
    }

    getcalls() {
        let callres: any
        // this.chart= ''


        callres = JSON.parse(this.alldata['call_previous_json'])
        this.cleanoutput = this.cleancallcount(callres)
        console.log(this.cleanoutput)

        this.oldcalls = 0
        for (let i = 0; i < this.cleanoutput.length; i++) {
            console.log(this.cleanoutput[i]['data'])
            this.oldcalls = this.oldcalls + this.cleanoutput[i]['data']
        }


        callres = JSON.parse(this.alldata['call_json'])
        console.log("This is calls data")
        console.log(callres)
        this.cleanoutput = this.cleancallcount(callres)
        console.log("Check this now")
        this.forsorting(this.cleanoutput)
        console.log(this.cleanoutput)
        this.forgraph['labels'] = []
        this.forgraph['data'] = []
        for (let j = 0; j < this.cleanoutput.length; j++) {
            this.forgraph['labels'].push(this.cleanoutput[j]['name'].substr(0, 1))
            this.forgraph['data'].push(this.cleanoutput[j]['data'])
        }

        this.getChart()

        console.log(this.forgraph)

        this.finalcalls = 0
        for (let i = 0; i < this.cleanoutput.length; i++) {
            console.log(this.cleanoutput[i]['data'])
            this.finalcalls = this.finalcalls + this.cleanoutput[i]['data']
        }


        // console.log(this.cleanoutput)
        // for (let j = 0; j < this.cleanoutput.length; j++){
        //    console.log(j['name'][0])
        //    console.log(j['data'])
        //    console.log('=====')
        // }

        // to initialize chart
        // this.chart = new Chart({
        //    chart: {
        //      type: 'column'
        //    },
        //    title: {
        //      text: 'Date wise sessions'
        //    },
        //    xAxis: {
        //      categories: this.forgraph['labels'],
        //    },
        //    credits: {
        //      enabled: false
        //    },
        //    series: [
        //      {
        //        name: 'Total sessions',
        //        type: 'column',
        //        data: this.forgraph['data']
        //      }

        //    ]
        //  });


        return callres

    }


    // function of functions called second in thread
    getdetail(useridoutput: any) {
        this.reviewsoutput = this.getreviews()
        this.callsoutput = this.getcalls()
        this.searchoutput = this.getsearches()
        console.log(this.callsoutput)
        this.postsoutput = this.getposts()
        this.getmychips()
    }


    // Latest item called on Init
    getuserinfo(userid: any) {
        this.data
            .getuserinfo(userid).subscribe((userres) => {
                // console.log("This is user data")
                //  console.log(userres)
                localStorage.setItem('userdata', JSON.stringify(userres))
                this.getdetail(userres)
                this.docname =  "Welcome " + (userres.BusinessName.length > 25 ? (userres.BusinessName.substr(0, 24) + "...") : userres.BusinessName)
            });
    }



    ngOnInit(): void {

        // console.log("Working")

        this.finalchips = { "No text!": "" }
        this.finalposchips = { "No text!": "" }

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

        // for (let i = 0; i < 20; i++){

        // }



    }



    negreviews() {
        // console.log("Neg reviews clicked")
        this.reviewcss['negcss'] = 'col-4 active'
        this.reviewcss['poscss'] = 'col-4 inactive'
        this.reviewcss['neucss'] = 'col-4 inactive'
        this.finalchips = this.mychips['negchips']
    }

    neureviews() {
        // console.log("Neu reviews clicked")
        this.reviewcss['negcss'] = 'col-4 inactive'
        this.reviewcss['poscss'] = 'col-4 inactive'
        this.reviewcss['neucss'] = 'col-4 active'
        this.finalchips = this.mychips['neuchips']
    }

    posreviews() {
        // console.log("Pos reviews clicked")
        this.reviewcss['negcss'] = 'col-4 inactive'
        this.reviewcss['poscss'] = 'col-4 active'
        this.reviewcss['neucss'] = 'col-4 inactive'
        this.finalchips = this.mychips['poschips']
    }

    yourpost() {
        // console.log("Neu reviews clicked")
        this.reviewcss['yourcss'] = 'col-6 active'
        this.reviewcss['comcss'] = 'col-6 inactive'
        this.finalposchips = this.mychips['yourchips']
    }

    compost() {
        // console.log("Pos reviews clicked")
        this.reviewcss['yourcss'] = 'col-6 inactive'
        this.reviewcss['comcss'] = 'col-6 active'
        this.finalposchips = this.mychips['comchips']
    }

    calls() {
        // console.log("Pos reviews clicked")
        this.reviewcss['locationcss'] = 'col-6 inactive'
        this.reviewcss['callscss'] = 'col-6 active'
        this.getcalls()
    }
    location() {
        // console.log("Pos reviews clicked")
        this.reviewcss['callscss'] = 'col-6 inactive'
        this.reviewcss['locationcss'] = 'col-6 active'

        this.forgraph['labels'] = []
        this.forgraph['data'] = []

        
      for (let j = 0; j < this.cleansearchouput.length; j++) {
         this.forgraph['labels'].push(this.cleansearchouput[j]['name'])
         this.forgraph['data'].push(this.cleansearchouput[j]['data'])
        }

        this.forgraph['labels'] = ["Direct searches", "Discovery searches", "Branded searches"]


     this.getChart()


    }


    monthlyreport(){
        this.router.navigate(['/monthlyreport'])        
    }


    logout(){
        localStorage.removeItem('userdata')
        localStorage.removeItem('alldata')
        localStorage.removeItem('userid')
        localStorage.removeItem('chips')

        this.router.navigate(['/login'])
    }



}