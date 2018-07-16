import { Component, OnInit } from '@angular/core';
import { SDK } from '../modules/sdk';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  text:string;
  ngOnInit() {
  }
  constructor(private coreService: CoreService) {
  }
  


}
