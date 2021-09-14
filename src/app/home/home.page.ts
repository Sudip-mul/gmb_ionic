import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

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

}
