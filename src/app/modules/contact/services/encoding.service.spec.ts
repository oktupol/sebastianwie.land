import { Base32Charset, EncodingService } from './encoding.service';

describe('EncodingService', () => {
  let encodingService: EncodingService;

  beforeEach(() => {
    encodingService = new EncodingService();
  });

  it('should create', () => {
    expect(encodingService).toBeTruthy();
  });

  describe('base32', () => {
    it('should encode Uint8Arrays correctly [1]', () => {
      const input = 'this is some text';
      const inputBytes = new Uint8Array(input.length);
      for (let i = 0; i < input.length; i++) inputBytes[i] = input.charCodeAt(i);

      expect(encodingService.base32(inputBytes)).toEqual('orugs4zanfzsa43pnvssa5dfpb2a');
    });

    it('should encode Uint8Arrays correctly [2]', () => {
      const inputBytes = new Uint8Array([
        58, 102, 45, 236, 14, 184, 114, 214, 162,
        196, 30, 80, 33, 167, 104, 85, 119, 84,
        232, 95, 70, 66, 124, 141, 167, 243, 235,
        19, 156, 130, 90, 209, 57, 108, 239, 64,
        137, 3, 15, 57
      ]);

      expect(encodingService.base32(inputBytes)).toEqual('hjtc33aoxbznniwedzicdj3ikv3vj2c7izbhzdnh6pvrhhecllits3hpiceqgdzz');
    });

    it('should encode Uint8Arrays with different charset', () => {
      const input = 'some more text being typed here';
      const inputBytes = new Uint8Array(input.length);
      for (let i = 0; i < input.length; i++) inputBytes[i] = input.charCodeAt(i);

      expect(encodingService.base32(inputBytes, Base32Charset.DEFAULT)).toEqual('onxw2zjanvxxezjaorsxq5bamjsws3theb2hs4dfmqqgqzlsmu');
      expect(encodingService.base32(inputBytes, Base32Charset.Z)).toEqual('qpzs43jypizzr3jyqt1zo7bycj1s15u8rb481hdfcoogo3m1cw');
      expect(encodingService.base32(inputBytes, Base32Charset.CROCKFORD)).toEqual('EDQPTS90DNQQ4S90EHJQGX10C9JPJVK741T7JW35CGG6GSBJCM');
      expect(encodingService.base32(inputBytes, Base32Charset.WORD_SAFE)).toEqual('PMhgpmF2Mfhh6mF2PVWhRv32JFWgWqX963p9Wr57JRR8RmHWJc');
    });
  });
});
