import { hexToRgb } from './helpers';

describe('Helpers', () => {

  describe('hexToRgb', () => {
    it('should return correct result', () => {
      expect(hexToRgb('#000')).toEqual({ r: 0o0, g: 0o0, b: 0o0 });
    });

    it('should return undefined when null is passed', () => {
      expect(hexToRgb(null)).toBeUndefined();
    });

    it('should return null when invalid argument is passed', () => {
      expect(hexToRgb('123456789')).toBeNull();
    });
  });

});
