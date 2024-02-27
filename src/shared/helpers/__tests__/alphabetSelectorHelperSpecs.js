import _ from 'lodash';

import { sandbox } from 'sinon';

import * as AlphabetSelectorHelper from 'src/shared/helpers/alphabetSelectorHelper';

const sinon = sandbox.create();

describe('AlphabetSelectorHelper', () => {
  context('should call scroll to header', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('and not scroll to header when header reference is undefined', () => {
      const scrollIntoViewStub = sinon.stub();

      const element = { hello: 'world' };

      _.set(element, 'scrollIntoView', scrollIntoViewStub);

      const header = 'A';
      const headerReferences = { [header]: undefined, B: element };

      AlphabetSelectorHelper.scrollToHeader(headerReferences)(header);

      expect(scrollIntoViewStub).to.not.be.called;
    });

    it('and not scroll to header when header reference is not an HTML Element', () => {
      const scrollIntoViewStub = sinon.stub();

      const element = { hello: 'world' };

      _.set(element, 'scrollIntoView', scrollIntoViewStub);

      const header = 'A';
      const headerReferences = { [header]: element };

      AlphabetSelectorHelper.scrollToHeader(headerReferences)(header);

      expect(scrollIntoViewStub).to.not.be.called;
    });

    it('and not scroll to header when header is not in header references', () => {
      const scrollIntoViewStub = sinon.stub();

      const element = document.createElement('div');

      _.set(element, 'scrollIntoView', scrollIntoViewStub);

      const header = 'A';
      const headerReferences = { B: element };

      AlphabetSelectorHelper.scrollToHeader(headerReferences)(header);

      expect(scrollIntoViewStub).to.not.be.called;
    });

    it('and scroll to header when header is in header references', () => {
      const scrollIntoViewStub = sinon.stub();

      const element = document.createElement('div');

      _.set(element, 'scrollIntoView', scrollIntoViewStub);

      const header = 'A';
      const headerReferences = { [header]: element };

      AlphabetSelectorHelper.scrollToHeader(headerReferences)(header);

      expect(scrollIntoViewStub).to.be.called;
    });
  });

  context('should call get alphabet and', () => {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    it('return the alphabet when it is passed in', () => {
      const result = AlphabetSelectorHelper.getAlphabet(alphabet);

      expect(result).to.deep.equal(alphabet);
    });

    it('return the alphabet when duplicate letters are passed in', () => {
      const duplicates = _.concat(alphabet, ...'ABCDEFGHIJK');

      const result = AlphabetSelectorHelper.getAlphabet(duplicates);

      expect(result).to.deep.equal(alphabet);
    });

    it('return the alphabet when duplicate letters are passed in', () => {
      const invalidAdditions = _.concat(alphabet, ...'123!');

      const result = AlphabetSelectorHelper.getAlphabet(invalidAdditions);

      expect(result).to.deep.equal(alphabet);
    });

    it('return the alphabet when words are passed in', () => {
      const invalidAdditions = _.concat(alphabet, 'hello', 'world');

      const result = AlphabetSelectorHelper.getAlphabet(invalidAdditions);

      expect(result).to.deep.equal(alphabet);
    });

    it('return a reduced alphabet when a reduced alphabet is passed in', () => {
      const reducedAlphabet = _.without(alphabet, 'Q', 'X', 'Z');

      const result = AlphabetSelectorHelper.getAlphabet(reducedAlphabet);

      expect(result).to.deep.equal(reducedAlphabet);
    });

    it('return an empty array when undefined is passed in', () => {
      const result = AlphabetSelectorHelper.getAlphabet(undefined);

      expect(result).to.deep.equal([]);
    });
  });

  it('should return an array with a hash if a hash is passed in', () => {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const hashedAlphabet = _.concat(alphabet, '#');

    const result = AlphabetSelectorHelper.getAlphabet(hashedAlphabet);

    expect(result).to.deep.equal(hashedAlphabet);
  });
});
