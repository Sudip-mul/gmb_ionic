import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.page.html',
  styleUrls: ['./monthlyreport.page.scss'],
})
export class MonthlyreportPage implements OnInit {

  userdata: any
  docname: any = "Please check the internet!"
  duration: any = 'as on 22nd Sep 2021'  


    // for everything
    alldata: any
    cleanoutput: any
    cleansearchouput: any = []
    finalcalls: number = 0
    oldcalls: number = 0
    finalsearch: any = {'Actions': 0, 'Views': 0, 'Photoviews': 0, 'Searches': 0}
    oldsearch: any = {'Actions': 0, 'Views': 0, 'Photoviews': 0, 'Searches': 0}

    forgraph: any = { "labels": ["Not available"], "data": [100] }

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

    reviewcss: any = { "negcss": "col-4 active", "poscss": "col-4 inactive", "neucss": "col-4 inactive", "yourcss": "col-6 active", "comcss": "col-6 inactive", "callscss": "col-6 active", "locationcss": "col-6 inactive"};
    finalchips: any = 'No reviews'
    finalposchips: any = 'No reviews'


    mainjson: any = { "procss": "col-4 active", "localcss": "col-4 inactive", "citycss": "col-4 inactive", "actionscss": "col-4 active", "viewscss": "col-4 inactive", "photoviewscss": "col-4 inactive", "googlecss": "col-6 active", "compcss": "col-6 inactive"};
    useimage: any = ''

    dispflag: any = {}

    outputtable: any
    tablevalue: any
    comptable: any
    compvalue: any


    focuskeywords: any = []


    allreviews: any = [];

    // Across chips
    mychips: any
    negchips: any
    poschips: any
    neuchips: any
    yourchips: any
    comchips: any

    tableflag: any = 1


    // For posts
    posts: any = { "curpost": [], "oldpost": [], "compost": [], "comoldpost": [] }
    postsoutput: any = {}

    callsoutput: any = {}
    // chart:any
    searchoutput: any = {}

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { 
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.docname =  "Welcome " + (this.userdata.BusinessName.length > 25 ? (this.userdata.BusinessName.substr(0, 24) + "...") : this.userdata.BusinessName)
    this.userid = JSON.parse(localStorage.getItem('userid'))


    this.userid = JSON.parse(localStorage.getItem('userid'))
    this.alldata = JSON.parse(localStorage.getItem('alldata'))

  }

  getChart2() {       
    // highcharts = Highcharts;
    Highcharts.chart('barChart2', {
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

}


  getChart() {       
    // highcharts = Highcharts;
    Highcharts.chart('barChart1', {
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

}



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

    return [dict1, dict2, dict3, dict4];
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

    for (let i = 0; i < this.cleansearchouput[0].length; i++) {
        this.oldsearch['Actions'] = this.oldsearch['Actions'] + this.cleansearchouput[0][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[1].length; i++) {
        this.oldsearch['Views'] = this.oldsearch['Views'] + this.cleansearchouput[1][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[2].length; i++) {
        this.oldsearch['Photoviews'] = this.oldsearch['Photoviews'] + this.cleansearchouput[2][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[3].length; i++) {
        this.oldsearch['Searches'] = this.oldsearch['Searches'] + this.cleansearchouput[3][i]['data']
    }


    searchres = JSON.parse(this.alldata['search_json'])
    console.log("Check here for logs")
    console.log(searchres)
    this.cleansearchouput = this.cleansearchcount(searchres)

    for (let i = 0; i < this.cleansearchouput[0].length; i++) {
       this.finalsearch['Actions'] = this.finalsearch['Actions'] + this.cleansearchouput[0][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[1].length; i++) {
        this.finalsearch['Views'] = this.finalsearch['Views'] + this.cleansearchouput[1][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[2].length; i++) {
        this.finalsearch['Photoviews'] = this.finalsearch['Photoviews'] + this.cleansearchouput[2][i]['data']
    }
    for (let i = 0; i < this.cleansearchouput[3].length; i++) {
        this.finalsearch['Searches'] = this.finalsearch['Searches'] + this.cleansearchouput[3][i]['data']
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

googlesearch(response: any){
    var dict = []
    response = JSON.parse(response)

    if (Object.keys(response).length != 0) {
        Object.keys(response).forEach(function(a) {
            Object.keys(response[a]).forEach(function(b) {
                Object.keys(response[a][b]).forEach(function(c) {
                    dict.push({"keyword": c.split('~')[0],"searchvolume": c.split('~')[1],"rank": response[a][b][c]})
                });
            });
        });
}
var sum = 0;
var counter = 0
var negcounter = 0
this.focuskeywords = []
for (let i = 0; i< dict.length; i++){
    if (dict[i]['rank'] != '-'){
        counter = counter + 1
        sum = sum + dict[i]['rank']
    }
    else{
        negcounter = negcounter + 1
        if (negcounter <= 5){
        this.focuskeywords.push(dict[i]['keyword'])
    }
    }
}

return [dict, sum/counter]

}

compsearch(response: any, name:any){
    var dict = []
   
    response = JSON.parse(response)

    if (Object.keys(response).length != 0) {
        Object.keys(response).forEach(function(a) {
            dict.push({"rank": response[a],"keyword": a})
        });
    }
    
    var rank = '-'
    for(let i = 0; i< dict.length; i++){
       
        if (dict[i]['keyword'] == name){
            rank = dict[i]['rank']

        }
    }
    return [dict, rank]

}

actions() {
    // console.log("Neg reviews clicked")
    this.mainjson['actionscss'] = 'col-4 active'
    this.mainjson['viewscss'] = 'col-4 inactive'
    this.mainjson['photoviewscss'] = 'col-4 inactive'

    this.forgraph['labels'] = []
    this.forgraph['data'] = []

    
  for (let j = 0; j < this.cleansearchouput[0].length; j++) {
     this.forgraph['labels'].push(this.cleansearchouput[0][j]['name'])
     this.forgraph['data'].push(this.cleansearchouput[0][j]['data'])
    }

    this.forgraph['labels'] = ["Website", "Phone", "Driving directions"]

    console.log("Chart called")
    this.getChart()

}

runoninit(){
        this.getsearches()
        this.actions()
        this.calls()

        // console.log("Working")
        this.useimage = this.alldata['gmb_profile_image']


        if (this.alldata['local_area_rank'] == 'NA'){
            this.dispflag['local'] = 'cardchange display'
        }
        else{
            this.dispflag['local'] = 'cardchange dontdisplay'
        }
    
        if (this.alldata['city_rank'] == 'NA'){
            this.dispflag['city'] = 'cardchange display'
        }
        else{
            this.dispflag['city'] = 'cardchange dontdisplay'
        }
    
        this.duration = this.getthedate()['duration']
    
    
        this.outputtable = this.googlesearch(this.alldata['google_search'])[0]
        this.tablevalue = this.googlesearch(this.alldata['google_search'])[1]
        
        this.comptable = this.compsearch(this.alldata['comp_search'],this.alldata['business_name'])[0]
        this.compvalue = this.compsearch(this.alldata['comp_search'],this.alldata['business_name'])[1]
    
        // console.log(this.comptable)
        console.log(this.outputtable)

}


ngOnInit(): void {

    this.runoninit()
}


profile() {
    // console.log("Neg reviews clicked")
    this.mainjson['procss'] = 'col-4 active'
    this.mainjson['localcss'] = 'col-4 inactive'
    this.mainjson['citycss'] = 'col-4 inactive'
    this.useimage = this.alldata['gmb_profile_image']
}

local() {
    // console.log("Neg reviews clicked")
    this.mainjson['procss'] = 'col-4 inactive'
    this.mainjson['localcss'] = 'col-4 active'
    this.mainjson['citycss'] = 'col-4 inactive'
    this.useimage = this.alldata['local_area_image']
}


city() {
    // console.log("Neg reviews clicked")
    this.mainjson['procss'] = 'col-4 inactive'
    this.mainjson['localcss'] = 'col-4 inactive'
    this.mainjson['citycss'] = 'col-4 active'
    this.useimage = this.alldata['city_image']
}

views() {
    // console.log("Neg reviews clicked")
    this.mainjson['actionscss'] = 'col-4 inactive'
    this.mainjson['viewscss'] = 'col-4 active'
    this.mainjson['photoviewscss'] = 'col-4 inactive'

    this.forgraph['labels'] = []
    this.forgraph['data'] = []

    
  for (let j = 0; j < this.cleansearchouput[1].length; j++) {
     this.forgraph['labels'].push(this.cleansearchouput[1][j]['name'])
     this.forgraph['data'].push(this.cleansearchouput[1][j]['data'])
    }

    this.forgraph['labels'] = ["Map Views", "Search Views"]

    this.getChart()
}

photoviews() {
    // console.log("Neg reviews clicked")
    this.mainjson['actionscss'] = 'col-4 inactive'
    this.mainjson['viewscss'] = 'col-4 inactive'
    this.mainjson['photoviewscss'] = 'col-4 active'

    this.forgraph['labels'] = []
    this.forgraph['data'] = []

    
  for (let j = 0; j < this.cleansearchouput[2].length; j++) {
     this.forgraph['labels'].push(this.cleansearchouput[2][j]['name'])
     this.forgraph['data'].push(this.cleansearchouput[2][j]['data'])
    }

    this.forgraph['labels'] = ["Merchant Photo Views", "Customers Photo Views"]

    this.getChart()

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

    this.getChart2()

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

    
  for (let j = 0; j < this.cleansearchouput[3].length; j++) {
     this.forgraph['labels'].push(this.cleansearchouput[3][j]['name'])
     this.forgraph['data'].push(this.cleansearchouput[3][j]['data'])
    }

    this.forgraph['labels'] = ["Direct searches", "Discovery searches", "Branded searches"]

    console.log(this.forgraph)


 this.getChart2()


}

rungooglesearch(){
    this.outputtable = this.googlesearch(this.alldata['google_search'])[0]
    this.mainjson['googlecss'] = 'col-6 active'
    this.mainjson['compcss'] = 'col-6 inactive'
    this.tableflag = 1
 
}


runcompsearch(){
    this.outputtable = this.compsearch(this.alldata['comp_search'],this.alldata['business_name'])[0]
    console.log(this.outputtable)
    let seqnum = 30
    for (let i = 0; i< this.outputtable.length; i++){
        if (this.outputtable[i]['rank'] == '-'){
            this.outputtable[i]['sequence'] = seqnum
            seqnum -= 1
        }
        else{
            this.outputtable[i]['sequence'] = this.outputtable[i]['rank']
        }
    }
    this.outputtable = this.outputtable.sort(function(x,y){return x["sequence"] - y["sequence"]});
    console.log(this.outputtable)

    this.mainjson['googlecss'] = 'col-6 inactive'
    this.mainjson['compcss'] = 'col-6 active'
    this.tableflag = 0

}



logout(){
    localStorage.removeItem('userdata')
    localStorage.removeItem('alldata')
    localStorage.removeItem('userid')
    localStorage.removeItem('chips')

    this.router.navigate(['/login'])
}



}