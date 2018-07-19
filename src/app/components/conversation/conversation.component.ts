import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.less']
})
export class ConversationComponent implements OnInit {
  form: FormGroup;
  messages =[];
  conversation:Object;
  constructor(private fb: FormBuilder, private coreServcie: CoreService,
  private stateService: StateService) {
    this.form = this.fb.group({
      text: ['']
    });
   }

  ngOnInit() {
  }
  sendMessage(){
    this.coreServcie.sdk.rainbowSDK['im'].sendMessageToConversation(this.conversation, this.form.value['text'] + " read!");
    console.log(this.form.value['text']);
  }
  displayMessage(conversation){
    this.conversation = conversation;
    conversation['messages'].forEach(element => {
      const type = element['from']['loginEmail'] === this.stateService.account.loginEmail? 'send': 'get';
      this.messages.push({
        text: element['data'],
        from: element['from']['loginEmail'],
        type: type
      })
      
    });
  }

}
