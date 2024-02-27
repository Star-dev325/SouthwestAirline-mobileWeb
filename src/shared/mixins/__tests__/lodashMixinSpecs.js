import _ from 'lodash';
import Q from 'q';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('lodash mixin', () => {
  context('toBoolean', () => {
    it(`should convert string 'false' to boolean false`, () => {
      expect(_.toBoolean('false')).to.be.false;
    });

    it(`should convert string 'true' to boolean true`, () => {
      expect(_.toBoolean('true')).to.be.true;
    });

    it(`should convert string 'FALSE' to boolean false`, () => {
      expect(_.toBoolean('FALSE')).to.be.false;
    });

    it(`should convert string 'TRUE' to boolean true`, () => {
      expect(_.toBoolean('TRUE')).to.be.true;
    });

    it(`should convert string '0' to boolean false`, () => {
      expect(_.toBoolean('0')).to.be.false;
    });

    it(`should convert string '1' to boolean true`, () => {
      expect(_.toBoolean('1')).to.be.true;
    });

    it(`should convert string 'random' to false`, () => {
      expect(_.toBoolean('random')).to.be.false;
    });

    it('should covert empty string to false', () => {
      expect(_.toBoolean('')).to.be.false;
    });
  });

  context('isPromise', () => {
    context('native promise', () => {
      it('should be a promise', () => {
        expect(_.isPromise(new Promise(_.noop))).to.be.true;
      });

      it('should be a promise when it resolved', () => {
        expect(_.isPromise(Promise.resolve())).to.be.true;
      });

      it('should be a promise when it rejected', () => {
        expect(_.isPromise(Promise.reject())).to.be.true;
      });
    });

    context('q promise', () => {
      it('should be a promise', () => {
        expect(_.isPromise(new Q())).to.be.true;
      });

      it('should be a promise when it resolved', () => {
        expect(_.isPromise(Q.resolve())).to.be.true;
      });

      it('should be a promise when it rejected', () => {
        expect(_.isPromise(Q.reject())).to.be.true;
      });
    });

    context('not a promise', () => {
      it('should not be a promise when it is a function', () => {
        expect(_.isPromise(_.noop)).to.be.false;
      });

      it('should not be a promise when it is an object', () => {
        expect(_.isPromise({})).to.be.false;
      });
    });
  });

  context('someExecute', () => {
    let fn1, fn2;

    beforeEach(() => {
      fn1 = sinon.stub();
      fn2 = sinon.stub();
    });

    it('should only execute fn1 when it not return undefined', () => {
      fn1.returns('value of fn1');
      fn2.returns('value of fn2');

      const result = _.someExecute([fn1, fn2])('context');

      expect(fn1).to.be.called;
      expect(fn2).not.to.be.called;
      expect(result).to.be.equal('value of fn1');
    });

    it('should execute fn1, fn2 when fn1 return undefined', () => {
      fn1.returns(undefined);
      fn2.returns('value of fn2');

      const result = _.someExecute([fn1, fn2])('context');

      expect(fn1).to.be.called;
      expect(fn2).to.be.called;
      expect(result).to.be.equal('value of fn2');
    });
  });

  context('hasAll', () => {
    const obj = {
      one: 'one',
      two: 'two',
      three: 'three'
    };

    it('should return true when all keys provided exist in the object', () => {
      expect(_.hasAll(obj, ['one', 'two'])).to.be.true;
    });

    it('should return false when some keys provided exist in the object', () => {
      expect(_.hasAll(obj, ['one', 'four'])).to.be.false;
    });

    it('should return false when no keys provided exist in the object', () => {
      expect(_.hasAll(obj, ['four', 'five'])).to.be.false;
    });

    it('should return false when the object is undefined', () => {
      expect(_.hasAll(undefined, ['one', 'two'])).to.be.false;
    });
  });

  context('hasAny', () => {
    const obj = {
      one: 'one',
      two: 'two',
      three: 'three'
    };

    it('should return true when all keys provided exist in the object', () => {
      expect(_.hasAny(obj, ['one', 'two'])).to.be.true;
    });

    it('should return true when some keys provided exist in the object', () => {
      expect(_.hasAny(obj, ['one', 'four'])).to.be.true;
    });

    it('should return false when no keys provided exist in the object', () => {
      expect(_.hasAny(obj, ['four', 'five'])).to.be.false;
    });

    it('should return false when the object is undefined', () => {
      expect(_.hasAny(undefined, ['one', 'two'])).to.be.false;
    });

    it('should return true when the keys provided exist in an object with inherited keys', () => {
      const inheritedObj = Object.create(obj);

      expect(_.hasAny(inheritedObj, ['one', 'four'])).to.be.true;
    });
  });

  context('omitIfEmpty', () => {
    it('should not omit if no fields are empty', () => {
      const one = 'one';
      const two = 'two';
      const three = 'three';

      expect(_.omitIfEmpty({ one, two, three })).to.eql({ one, two, three });
    });

    it('should omit a field if empty', () => {
      const one = undefined;
      const two = 'two';
      const three = 'three';

      expect(_.omitIfEmpty({ one, two, three })).to.eql({ two, three });
    });

    it('should omit all fields if all empty', () => {
      const one = undefined;
      const two = undefined;
      const three = undefined;

      expect(_.omitIfEmpty({ one, two, three })).to.eql({});
    });
  });

  context('unflatten', () => {
    it('should flatten object with delimited keys', () => {
      expect(_.unflatten({ 'a.b.c': 'd' })).to.eql({ a: { b: { c: 'd' } } });
    });
  });
});
