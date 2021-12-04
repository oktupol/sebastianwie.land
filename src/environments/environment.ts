// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  backendUrl: 'https://localhost:8001/api',

  contact: {
    // Obfuscating information for scrapers on Github
    to: `Sebastian Wieland <${[
      115, 101, 98, 97, 115, 116, 105,
      43, 99, 111, 110, 116, 97, 99,
      116, 102, 111, 114, 109, 64, 110,
      119, 105, 101, 46, 108, 97, 110,
      100
    ].map(b => String.fromCharCode(b)).join('')}>`,
    messageIdDomain: 'sebastianwieland.de',
    maxMessageSize: 2_500_000,
    // maxEncryptedMessageSize: 5_000_000,
    maxEncryptedMessageSize: 5,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
