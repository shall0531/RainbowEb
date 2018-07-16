export class ContactModel{
    jid:string;
    lastname: string;
    avatar: string;
    name: {
        value:string;
    }
    imStatus: string;
    conversation: Object;
    color: string;
    lastActivityMessage:string;
    displayName: string;
    constructor(jid:string,
        lastname: string,
        avatar: string,
        value: string,
        imStatus: string,
        conversation: Object,// todo: object conversation
        color: string,
        lastActivityMessage:string,
        displayName: string){
            this.jid = jid;
            this.lastname = lastname;
            this.avatar = avatar;
            this.name.value = value;
            this.imStatus = imStatus;
            this.conversation = conversation;
            this.color = color;
            this.lastActivityMessage = lastActivityMessage;
            this.displayName = this.displayName;
        }
}