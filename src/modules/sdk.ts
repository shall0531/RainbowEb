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

    initialize(login: string, password: string) {
        console.log("[DEMO] :: Starter-Kit of the Rainbow SDK for Web with React started!");

        var applicationID = "liu.xiaoyi90@gmail.com",
            applicationSecret = "Pass_test_1234";

        /* Bootstrap the SDK */
        angular.bootstrap(document, ["sdk"]).get("rainbowSDK");
        const self = this;
        /* Callback for handling the event 'RAINBOW_ONREADY' */
        const onReady = () => {
            //var myRainbowLogin = "liu.xiaoyi90@gmail.com";       // Replace by your login
            //var myRainbowPassword = "Pass_test_1234"; // Replace by your password
            // The SDK for Web is ready to be used, so you can sign in
            rainbowSDK.connection.signin(login, password)
                .then(function (account) {
                   self._account = account.account;
                })
                .catch(function (err) {
                    console.log('connextion fail');
                    // An error occurs (e.g. bad credentials)
                });
        };
        const onConnectionStateChangeEvent = (event, status) =>{

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

        // Subscribe to Rainbow connection change
        $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);


        /* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */
        const onLoaded = () =>{
            console.log("[DEMO] :: On SDK Loaded !");

            rainbowSDK.initialize().then(function () {
                console.log("[DEMO] :: Rainbow SDK is initialized!");
            }).catch(function () {
                console.log("[DEMO] :: Something went wrong with the SDK...");
            });
        };

        /* Listen to the SDK event RAINBOW_ONREADY */
        $(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

        /* Listen to the SDK event RAINBOW_ONLOADED */
        $(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

        rainbowSDK.load();
    }
    get account(): AccountModel{
        return this._account;
    }

    get version() {
        return rainbowSDK.version;
    }
};

/*let sdk = new SDK();

export { sdk };*/
