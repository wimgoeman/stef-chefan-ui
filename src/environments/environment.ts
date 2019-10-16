// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:8080",
  firebase: {
    apiKey: "AIzaSyAoJYHZCuX_h006vrt1TrkaTcnuZ_4CJK0",
    authDomain: "stef-chefan.firebaseapp.com",
    databaseURL: "https://stef-chefan.firebaseio.com",
    projectId: "stef-chefan",
    storageBucket: "stef-chefan.appspot.com",
    messagingSenderId: "141241829645",
    appId: "1:141241829645:web:8cc21bafa4698339878844"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
