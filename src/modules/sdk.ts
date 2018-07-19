import { AccountModel } from "../app/models/account.model";
import { Observable } from "rxjs";
import { ContactModel } from "../app/models/contact.model";
import { CoreService } from "../app/services/core.service";
import { StateService } from "../app/services/state.service";
declare var rainbowSDK: any;
declare var angular: any;
declare var $: any;

/**
 * SDK
 * TypeScript Singleton
 * Centralize access to rainbowSDK global variable (avoid dispatching rainbowSDK anywhere in the application)
 */
export class SDK {
    private _account: AccountModel;
    selectedContact: any;
    _onReady: Observable<any>;
    _onLoaded: Observable<any>;
    _recieveMessage: Observable<any>;
    conversation: any;
    account: any;
    contacts: any;
    constructor(private stateService: StateService) {
    }
    onReady(login, password): Promise<void> {
        //var myRainbowLogin = "liu.xiaoyi90@gmail.com";       // Replace by your login
        //var myRainbowPassword = "Pass_test_1234"; // Replace by your password
        return rainbowSDK.connection.signin(login, password)
            .then((account) => {
                this.stateService.signin = true;
                this.stateService.account = account.account;
                console.log(account);
                return new Promise<void>(resolve => resolve());
            })
            .catch((err) => {
                console.log('connextion fail');
            });
    };
    onLoaded() {
        console.log("[DEMO] :: On SDK Loaded !");
        rainbowSDK.initialize().then(function () {
            console.log("[DEMO] :: Rainbow SDK is initialized!");
        }).catch(function () {
            console.log("[DEMO] :: Something went wrong with the SDK...");
        });
    };
    /* Handler called when the user clicks on a contact */
    onContactSelected(contactJid): Promise<void> {
        this.selectedContact = rainbowSDK.contacts.getContactByJID(contactJid);
        return new Promise<void>((resolve) => resolve());
        // Cont act not found locally, ask to the server
        /*if (!this.selectedContact) {
            rainbowSDK.contacts.searchContactById(contactJid).then(function (contact) {
                this.selectedContact = contact;

                /*if (this.selectedContact) {
                    
                }
                else {
                    // Strange, no contact with that Id. Are you sure of that id ?...
                }

            }).catch((err) => {
                //Something when wrong with the server. Handle the trouble here
            });
        }*/
    };

    onConnectionStateChangeEvent(event, status) {

        switch (status) {
            case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:
                // The state of the connection has changed to "connected" which means that your application is now connected to Rainbow
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:
                // The state of the connection is now in progress which means that your application try to connect to Rainbow
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:
                // The state of the connection changed to "disconnected" which means that your application is no more connected to Rainbow
                break;
            default:
                break;
        };
    };

    initialize() {
        console.log("[DEMO] :: Starter-Kit of the Rainbow SDK for Web with React started!");

        var applicationID = "liu_bis.xiaoyi90@gmail.com",
            applicationSecret = "Pass_test_1234";


        /* Bootstrap the SDK */
        angular.bootstrap(document, ["sdk"]).get("rainbowSDK");
        this._onReady = new Observable((observer) => {
            observer.next(rainbowSDK.RAINBOW_ONREADY);
            observer.complete();
        });
        // Subscribe to Rainbow connection change
        // $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this.onConnectionStateChangeEvent);
        this._onLoaded = new Observable((observer) => {
            observer.next(rainbowSDK.RAINBOW_ONLOADED);
            
        });
        this._onLoaded.subscribe(value => {
            this.onLoaded();
        });

        this._recieveMessage = new Observable((observer) => {
            observer.next(rainbowSDK.im.Rainbow_ONNEWIMMESSAGERECEIVED);
        });
        rainbowSDK.load();
    }
    
    

    get version() {
        return rainbowSDK.version;
    }

    get allContacts() {
        return rainbowSDK.contacts.getAll();
    }
    getConversationByContact(): Promise<any> {
        return rainbowSDK.conversations.openConversationForContact(this.selectedContact).then(function (conversation) {
            return new Promise<any>(resolve => resolve(conversation));
        }).catch(function (err) {

        });
    }
    displayMessage(conversation: any): Promise<any> {
        const currentPage = 0;
        return rainbowSDK.im.getMessagesFromConversation(conversation, 30);
    }
    get rainbowSDK(): Object{
        return rainbowSDK;
    }

};

/*let sdk = new SDK();

export { sdk };*/
