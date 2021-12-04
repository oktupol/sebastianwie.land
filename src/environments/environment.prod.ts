export const environment = {
  production: true,

  backendUrl: 'https://sebastianwieland.de/api',

  contact: {
    // Obfuscating information for scrapers on Github
    from: `Contact Form <${[
      110, 111, 45, 114, 101, 112, 108,
      121, 64, 115, 101, 98, 97, 115,
      116, 105, 97, 110, 119, 105, 101,
      108, 97, 110, 100, 46, 100, 101
    ].map(b => String.fromCharCode(b)).join('')}>`,
    to: `Sebastian Wieland <${[
      115, 101, 98, 97, 115, 116, 105,
      43, 99, 111, 110, 116, 97, 99,
      116, 102, 111, 114, 109, 64, 110,
      119, 105, 101, 46, 108, 97, 110,
      100
    ].map(b => String.fromCharCode(b)).join('')}>`,
    messageIdDomain: 'sebastianwieland.de',
  }
};
