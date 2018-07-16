import { AccountModel } from "../app/models/account.model";

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

    /* Handler called when the user clicks on a contact */
    onContactSelected = (contactId) => {
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

    onConnectionStateChangeEvent = (event, status) => {

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

    initialize(login: string, password: string) {
        console.log("[DEMO] :: Starter-Kit of the Rainbow SDK for Web with React started!");

        var applicationID = "liu_bis.xiaoyi90@gmail.com",
            applicationSecret = "Pass_test_1234";
        var onReady = () => {
                //var myRainbowLogin = "liu.xiaoyi90@gmail.com";       // Replace by your login
                //var myRainbowPassword = "Pass_test_1234"; // Replace by your password
                // The SDK for Web is ready to be used, so you can sign in
                const self = this;
                rainbowSDK.connection.signin(applicationID, applicationSecret)
                    .then(function (account) {
                        self._account = account.account;
                    })
                    .catch(function (err) {
                        console.log('connextion fail');
                        // An error occurs (e.g. bad credentials)
                    });
            };
        var onLoaded = () => {
                console.log("[DEMO] :: On SDK Loaded !");
                rainbowSDK.initialize().then(function () {
                    console.log("[DEMO] :: Rainbow SDK is initialized!");
                }).catch(function () {
                    console.log("[DEMO] :: Something went wrong with the SDK...");
                });
            };
        /* Bootstrap the SDK */
        angular.bootstrap(document, ["sdk"]).get("rainbowSDK");
        const self = this;
        /* Callback for handling the event 'RAINBOW_ONREADY' */

        // Subscribe to Rainbow connection change
        $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this.onConnectionStateChangeEvent);

        /* Listen to the SDK event RAINBOW_ONREADY */
        $(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

        /* Listen to the SDK event RAINBOW_ONLOADED */
        $(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

        rainbowSDK.load();
    }
    get account(): AccountModel {
        return this._account;
    }

    get version() {
        return rainbowSDK.version;
    }
    get contacts(){
        return rainbowSDK.contacts.getAll();
    }
};

/*let sdk = new SDK();

export { sdk };*/
