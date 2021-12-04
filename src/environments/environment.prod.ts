export const environment = {
  production: true,

  backendUrl: 'https://sebastianwieland.de/api',

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
  }
};