import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { ContactModel } from '../../models/contact.model';
import { StateService } from '../../services/state.service';
import { ConversationComponent } from '../conversation/conversation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  contacts = [];
  contactSelected = '';
  subscription$: Subscription;
  conversation = [];
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;
  constructor(private coreService: CoreService,
    private stateService: StateService) {

  }


  ngOnInit() {
    this.getContacts();
    this.subscription$ = this.coreService.sdk._recieveMessage.subscribe(value=>{
      this.onNewMessageReceived('','yes', this.conversation);
    });
  }
  onNewMessageReceived(event, message, conversation) {

    var messageContent = "";

    // Acknowledge it
    this.coreService.sdk.rainbowSDK['im'].markMessageFromConversationAsRead(conversation, message);

    // Text message received
    messageContent = message.data;

    // Send an answer 
    this.coreService.sdk.rainbowSDK['im'].sendMessageToConversation(conversation, messageContent + " read!");
    
};
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    
  }
  getContacts() {
    console.log(this.coreService.sdk.allContacts);
    this.coreService.sdk.allContacts.forEach(element => {
      this.contacts.push({
        jid: element['jid'],
        avatar: element['avatar'],
        name: element['name']['value'],
        imStatus: element['imStatus']
      });
    });
  }
  selectContact(jid: string) {
    this.coreService.sdk.onContactSelected(jid)
      .then(value => {
        this.coreService.sdk.getConversationByContact().then(value => {
          this.coreService.sdk.displayMessage(value).then(conversation => {
            this.conversation = conversation
            this.conversationComponent.displayMessage(conversation);
          });
        })
      });
  }


}
