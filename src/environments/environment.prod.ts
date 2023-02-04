export const environment = {
  production: true,

  // Obfuscating information for automatic scrapers on Github
  backendUrl: [
    104, 116, 116, 112, 115,  58,  47,  47, 114, 107,  98,
    121,  54, 105,  98, 107, 121, 114, 108,  50,  51, 114,
     55,  99, 119,  99, 112, 105, 114, 109,  98, 109, 109,
    121,  48, 115, 117, 113, 122, 100,  46, 108,  97, 109,
     98, 100,  97,  45, 117, 114, 108,  46, 101, 117,  45,
     99, 101, 110, 116, 114,  97, 108,  45,  49,  46, 111,
    110,  46,  97, 119, 115,  47
  ].map(b => String.fromCharCode(b)).join(''),

  contact: {
    to: `Sebastian Wieland <${[
      115, 101, 98,  97, 115,
      116, 105, 64, 110, 119,
      105, 101, 46, 108,  97,
      110, 100
    ].map(b => String.fromCharCode(b)).join('')}>`,
    messageIdDomain: 'aws.sebastianwie.land',
    maxMessageSize: 2_500_000,
    maxEncryptedMessageSize: 5_000_000,
    senderVerificationAddress: [
      115, 101, 98,  97, 115,
      116, 105, 64, 110, 119,
      105, 101, 46, 108,  97,
      110, 100
    ].map(b => String.fromCharCode(b)).join(''),
  }
};
