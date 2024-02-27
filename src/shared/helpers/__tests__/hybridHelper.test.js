import { buildNativeAppLink } from 'src/shared/helpers/hybridHelper';

describe('hybridHelper', () => {
  describe('buildNativeAppLink', () => {
    it('should generate an app link with no search params', () => {
      const expectedRoute = 'app://test/route';
      const route = 'test/route';

      expect(buildNativeAppLink(route)).toEqual(expectedRoute);
    });

    it('should generate an app link with search params', () => {
      const expectedRoute = 'app://test/route?token=abc.123.xyz';
      const route = 'test/route';
      const search = {
        token: 'abc.123.xyz'
      };

      expect(buildNativeAppLink(route, search)).toEqual(expectedRoute);
    });

    it('should replace special characters in the search query', () => {
      const encodedQuestionMark = '%3F';
      const expectedRoute = `app://test/route?token=abc.123${encodedQuestionMark}xyz`;
      const route = 'test/route';
      const search = {
        token: 'abc.123?xyz'
      };

      expect(buildNativeAppLink(route, search)).toEqual(expectedRoute);
    });

    it('should not encode an empty search object', () => {
      const expectedRoute = 'app://test/route';
      const route = 'test/route';
      const search = {};

      expect(buildNativeAppLink(route, search)).toEqual(expectedRoute);
    });
  });
});
