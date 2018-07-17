import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  contacts = [];
  constructor(private coreService: CoreService) {
    this.coreService.sdk._onReady.subscribe(value => {
      this.coreService.sdk.onReady('liu.xiaoyi90@gmail.com', 'Pass_test_1234');
    });
  }

  ngOnInit() {
    this.contacts = this.getContacts();
  }
  getContacts() {
    return [{
      jid: 'id',
      avatar:'',
      name: 'jon snow',
      imStatus: 'presence',
      lastActivityMessage: 'hello',
      displayName: 'jon snow'
    },
    {
      jid: 'id',
      avatar:'',
      name: 'jon snow',
      imStatus: 'presence',
      lastActivityMessage: 'hello,what\'up? I just want to test how far that I can reach the text-overflow',
      displayName: 'jon snow'
    }, {
      jid: 'id',
      avatar:'',
      name: 'jon snow',
      imStatus: 'presence',
      lastActivityMessage: 'hello',
      displayName: 'jon snow'
    }];
    // console.log(this.coreService.sdk.contacts);
    /*this.coreService.sdk.contacts.map(elm=>{
      this.contacts.push({jid: elm['jid'],
                lastname: elm['lastname'], 
                name: elm['name']['value']
                imStatus: elm['imStatus'],
                elm['conversation'], elm['color'], elm['lastActivityMessage'],
              elm['displayName']}), this.contacts);
    });*/

  }

}
