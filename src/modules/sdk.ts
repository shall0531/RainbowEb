import { AccountModel } from "../app/models/account.model";
import { Observable } from "rxjs";
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
    account:AccountModel;
    contacts = [];

    onReady(login, password):void {
        //var myRainbowLogin = "liu.xiaoyi90@gmail.com";       // Replace by your login
        //var myRainbowPassword = "Pass_test_1234"; // Replace by your password
        const self = this;
        rainbowSDK.connection.signin(login, password)
            .then((account) =>{
                this.account = account.account;
                this.contacts = rainbowSDK.contacts.getAll();
            })
            .catch((err) =>{
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
    onContactSelected(contactId) {
        this.selectedContact = rainbowSDK.contacts.getContactById(contactId);

        // Cont act not found locally, ask to the server
        if (!this.selectedContact) {
            rainbowSDK.contacts.searchContactById(contactId).then(function (contact) {
                this.selectedContact = contact;

                if (this.selectedContact) {
                    // Ok, we have the contact object
                }
                else {
                    // Strange, no contact with that Id. Are you sure of that id ?...
                }

            }).catch((err) => {
                //Something when wrong with the server. Handle the trouble here
            });
        }
    };
    /* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */

    onConnectionStateChangeEvent(event, status){
       
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
        /* Listen to the SDK event RAINBOW_ONREADY */
        //$(document).on(rainbowSDK.RAINBOW_ONREADY, this.onReady);
        /* Listen to the SDK event RAINBOW_ONLOADED */
       // $(document).on(rainbowSDK.RAINBOW_ONLOADED, this.onLoaded);
        this._onLoaded = new Observable((observer) => {
            observer.next(rainbowSDK.RAINBOW_ONLOADED);
            observer.complete();
        });
        this._onLoaded.subscribe(value=>{
            this.onLoaded();
        });

        rainbowSDK.load();
    }

    get version() {
        return rainbowSDK.version;
    }
};

/*let sdk = new SDK();

export { sdk };*/
