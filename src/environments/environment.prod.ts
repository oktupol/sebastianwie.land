export const environment = {
  production: true,

  // Obfuscating information for automatic scrapers on Github
  backendUrl: [
    104, 116, 116, 112, 115,  58,  47,  47,
     97, 112, 105,  46,  97, 119, 115,  46,
    115, 101,  98,  97, 115, 116, 105,  97,
    110, 119, 105, 101,  46, 108,  97, 110,
    100
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
