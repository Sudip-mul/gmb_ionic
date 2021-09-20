import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  doctorphoto: any = './assets/doctor_pic.png';
  constructor() { }

  ngOnInit() {
  }

}
