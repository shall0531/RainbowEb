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
    //this.text = this.coreService.account.userId;
  }
  constructor(private coreService: CoreService) {
  }
  


}
