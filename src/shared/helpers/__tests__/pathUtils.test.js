import {
  buildPathWithParamAndQuery,
  buildPathWithParamAndUniqueQuery,
  buildPathWithQuery,
  transformSearchToQuery,
  buildLocation
} from 'src/shared/helpers/pathUtils';

describe('pathUtils', () => {
  describe('buildPathWithParamAndQuery', () => {
    it('should return original path when there is no any param and query', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/path');

      expect(pathWithParams).toEqual('new/path');
    });

    it('should build path with param', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/:param/route', { param: 'good' });

      expect(pathWithParams).toEqual('new/good/route');
    });

    it('should build path with one query', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/route', null, { tab: 'flight' });

      expect(pathWithParams).toEqual('new/route?tab=flight');
    });

    it('should build path with two querys', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/route', null, { firstName: 'funfun', lastName: 'liu' });

      expect(pathWithParams).toEqual('new/route?firstName=funfun&lastName=liu');
    });

    it('should build path with boolean value querys', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/route', null, {
        firstName: 'funfun',
        lastName: 'liu',
        robots: false
      });

      expect(pathWithParams).toEqual('new/route?firstName=funfun&lastName=liu&robots=false');
    });

    it('should build path with param and query', () => {
      const pathWithParams = buildPathWithParamAndQuery(
        'new/:param/route',
        { param: 'good' },
        {
          firstName: 'funfun',
          lastName: 'liu'
        }
      );

      expect(pathWithParams).toEqual('new/good/route?firstName=funfun&lastName=liu');
    });

    it('should filter all null or undefined value', () => {
      const pathWithParams = buildPathWithParamAndQuery(
        'new/:param/route',
        { param: 'good' },
        {
          firstName: 'funfun',
          lastName: undefined
        }
      );

      expect(pathWithParams).toEqual('new/good/route?firstName=funfun');
    });

    it('should build path with object like queries', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/route', null, {
        query: {
          forced: true,
          amountDue: 0,
          direction: ['outbound']
        }
      });

      expect(pathWithParams).toEqual(
        'new/route?query%5Bforced%5D=true&query%5BamountDue%5D=0&query%5Bdirection%5D%5B%5D=outbound'
      );
    });

    it('should build path with only one question mark', () => {
      const pathWithParams = buildPathWithParamAndQuery('new/route?query=one', null, {
        firstName: 'funfun',
        lastName: 'liu'
      });

      expect(pathWithParams).toEqual('new/route?query=one&firstName=funfun&lastName=liu');
    });

    it('should return empty string if path is empty', () => {
      const query = { query2: 'new-value2' };

      expect(buildPathWithParamAndQuery('', null, query)).toEqual('');
    });

    it('should return undefined if path is undefined', () => {
      const query = { query2: 'new-value2' };

      expect(buildPathWithParamAndQuery(undefined, null, query)).toEqual(undefined);
    });
  });

  describe('buildPathWithParamAndUniqueQuery', () => {
    it('should build path with boolean value querys', () => {
      const pathWithParams = buildPathWithParamAndUniqueQuery('new/route', null, {
        firstName: 'funfun',
        lastName: 'liu',
        robots: false
      });

      expect(pathWithParams).toEqual('new/route?firstName=funfun&lastName=liu&robots=false');
    });

    it('should build path with params and queries', () => {
      const pathWithParams = buildPathWithParamAndUniqueQuery('new/:recordLocator/route', { recordLocator: 'RECLOC' }, {
        firstName: 'funfun',
        lastName: 'liu'
      });

      expect(pathWithParams).toEqual(
        'new/RECLOC/route?firstName=funfun&lastName=liu'
      );
    });

    it('should build path with params and with unique queries', () => {
      const pathWithParams = buildPathWithParamAndUniqueQuery('new/:recordLocator/route', { recordLocator: 'RECLOC' }, {
        firstName: 'funfun',
        lastName: 'liu',
        recordLocator: 'RECLOC'
      });

      expect(pathWithParams).toEqual(
        'new/RECLOC/route?firstName=funfun&lastName=liu'
      );
    });

    it('should build path with params not used and queries', () => {
      const pathWithParams = buildPathWithParamAndUniqueQuery('new/route', { recordLocator: 'RECLOC' }, {
        firstName: 'funfun',
        lastName: 'liu',
        recordLocator: 'RECLOC'
      });

      expect(pathWithParams).toEqual(
        'new/route?firstName=funfun&lastName=liu&recordLocator=RECLOC'
      );
    });
  });

  describe('buildPathWithQuery', () => {
    it('should return path when no query params are passed in', () => {
      const path = 'https://path.com';

      expect(buildPathWithQuery(path, undefined)).toEqual(path);
    });

    it('should return path with params when no query params are passed in', () => {
      const path = 'https://path.com/with/params';

      expect(buildPathWithQuery(path, undefined)).toEqual(path);
    });

    it('should return path with existing query params when no additional query params are passed in', () => {
      const path = 'https://path.com/with/params?query=value';

      expect(buildPathWithQuery(path, undefined)).toEqual(path);
    });

    it('should return path with additional query params when had no existing query params', () => {
      const path = 'https://path.com/with/params';
      const query = { query1: 'value1' };

      expect(buildPathWithQuery(path, query)).toEqual(`${path}?query1=value1`);
    });

    it('should return path with existing query params and additional query params', () => {
      const path = 'https://path.com/with/params?query1=value1';
      const query = { query2: 'value2' };

      expect(buildPathWithQuery(path, query)).toEqual(`${path}&query2=value2`);
    });

    it('should return path with existing query params and additional query params which overwrite', () => {
      const path = 'https://path.com/with/params?query1=value1&query2=value2';
      const query = { query2: 'new-value2' };

      expect(buildPathWithQuery(path, query)).toEqual('https://path.com/with/params?query1=value1&query2=new-value2');
    });
  });

  describe('transformSearchToQuery', () => {
    it('should transform search to query object', () => {
      const queryObject = transformSearchToQuery('?a=1&b=2');

      expect(queryObject).toMatchObject({
        a: '1',
        b: '2'
      });
    });

    it('should transform search to query object without ?', () => {
      const queryObject = transformSearchToQuery('a=1&b=2');

      expect(queryObject).toMatchObject({
        a: '1',
        b: '2'
      });
    });

    it('should transform search to query object when stringify search string have object', () => {
      const queryObject = transformSearchToQuery('to=a&simpleLogin=true&withPoints=true&query%5Bforced%5D=true');

      expect(queryObject).toMatchObject({
        to: 'a',
        simpleLogin: 'true',
        withPoints: 'true',
        query: { forced: 'true' }
      });
    });

    it('should transform null to empty object', () => {
      const queryObject = transformSearchToQuery(null);

      expect(queryObject).toMatchObject({});
    });
  });

  describe('buildLocation', () => {
    it('should build location', () => {
      const location = buildLocation('new/route');

      expect(location.pathname).toEqual('new/route');
      expect(location.search).toEqual('');
      expect(location.state).toEqual(undefined);
    });

    it('should build location with path params', () => {
      const location = buildLocation('new/:one/route/:two', { one: 'param-one', two: 'param-two' });

      expect(location.pathname).toEqual('new/param-one/route/param-two');
      expect(location.search).toEqual('');
      expect(location.state).toEqual(undefined);
    });

    it('should build location with path params and single query', () => {
      const location = buildLocation('new/:one/route/:two', { one: 'param-one', two: 'param-two' }, { key: 'value' });

      expect(location.pathname).toEqual('new/param-one/route/param-two');
      expect(location.search).toEqual('?key=value');
      expect(location.state).toEqual(undefined);
    });

    it('should build location with path params and queries', () => {
      const location = buildLocation(
        'new/:one/route/:two',
        { one: 'param-one', two: 'param-two' },
        { keyOne: 'valueOne', keyTwo: 'valueTwo' }
      );

      expect(location.pathname).toEqual('new/param-one/route/param-two');
      expect(location.search).toEqual('?keyOne=valueOne&keyTwo=valueTwo');
      expect(location.state).toEqual(undefined);
    });

    it('should build location with path params and queries and state', () => {
      const location = buildLocation(
        'new/:one/route/:two',
        { one: 'param-one', two: 'param-two' },
        { keyOne: 'valueOne', keyTwo: 'valueTwo' },
        { key: 'value' }
      );

      expect(location.pathname).toEqual('new/param-one/route/param-two');
      expect(location.search).toEqual('?keyOne=valueOne&keyTwo=valueTwo');
      expect(location.state).toEqual({ key: 'value' });
    });
  });
});
