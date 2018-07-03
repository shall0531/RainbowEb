import { Component, OnInit } from '@angular/core';
import * as angular from 'angular';

const rainbowSDK = angular.bootstrap(document, ["sdk"]).get("rainbowSDK");
const applicationID = "liu.xiaoyi90@gmail.com",
const applicationSecret = "Pass_test_1234";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(rainbowSDK);
    rainbowSDK.load();
    rainbowSDK.initialize(applicationID, applicationSecret).then(() => {
      console.log("[DEMO] :: Rainbow SDK is initialized!");
    }).catch(function (err) {
      console.log("[DEMO] :: Something went wrong with the SDK...", err);
    });
  }

  onReady(): void {
    console.log("[DEMO] :: On SDK Ready !");
    // do something when
  }
}
