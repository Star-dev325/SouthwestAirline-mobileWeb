import proxyquire from 'proxyquire';
import storeWithExpiration from 'src/shared/helpers/storeWithExpiration';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('StoreWithExpiration', () => {
  const store = require('src/shared/helpers/storeWithExpiration').default;

  it('should always return value when there is no expiration', () => {
    store.save('data-key', { data: 'data' });

    const result = store.load('data-key');

    expect(result.data).to.equal('data');
  });

  it('should return null if data expired', () => {
    const mockDayjs = function () {
      return {
        add: sinon.stub().returns({
          unix() {
            return 1449135169;
          }
        }),
        unix: sinon.stub().returns(1449135170)
      };
    };
    const store = proxyquire('src/shared/helpers/storeWithExpiration', {
      dayjs: mockDayjs
    }).default;

    store.save('data-key', { data: 'data' }, 1);

    const result = store.load('data-key');

    expect(result === null).to.be.true;
  });

  it('should remove data if data expired', () => {
    const mockDayjs = function () {
      return {
        add: sinon.stub().returns({
          unix() {
            return 1449135169;
          }
        }),
        unix: sinon.stub().returns(1449135170)
      };
    };
    const store = proxyquire('src/shared/helpers/storeWithExpiration', {
      dayjs: mockDayjs
    }).default;

    store.save('data-key', { data: 'data' }, 1);

    const store2 = require('store2');

    expect(store2.get('data-key')).to.exist;

    store.load('data-key');

    expect(store2.get('data-key') === null).to.be.true;
  });

  it('should return value if data is not expired', () => {
    const mockDayjs = function () {
      return {
        add: sinon.stub().returns({
          unix() {
            return 1449135171;
          }
        }),
        unix: sinon.stub().returns(1449135170)
      };
    };
    const store = proxyquire('src/shared/helpers/storeWithExpiration', {
      dayjs: mockDayjs
    }).default;

    store.save('data-key', { data: 'data' }, 10);

    const result = store.load('data-key');

    expect(result).to.deep.equal({ data: 'data' });
  });

  it('should return null if data is not stored', () => {
    const result = store.load('data-key');

    expect(result === null).to.be.true;
  });

  it('should use timestamp override minutes when expiration minutes are undefined', () => {
    const store2 = require('store2');

    storeWithExpiration.save('data-key', { data: 'data' }, undefined, 123456789);

    expect(store2.get('data-key').timestamp).to.equal(123456789);
  });

  it('should return undefined when existing and expiration minutes are undefined', () => {
    const store2 = require('store2');

    storeWithExpiration.save('data-key', { data: 'data' }, undefined, undefined);

    expect(store2.get('data-key').timestamp).to.equal(undefined);
  });
});
