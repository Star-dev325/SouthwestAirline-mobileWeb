import _ from 'lodash';
import filterDOMProps, { filterDOMPropsWithMask } from 'src/shared/helpers/dom-whitelist/filterDomProps';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('filterDomProps', () => {
  context('when filtering dom props for a non-masked input', () => {
    it('should return an empty props object when it receives an empty props list', () => {
      expect(filterDOMProps({})).to.deep.equal({});
    });

    it('should filter invalid html attributes from the props object', () => {
      const validProps = {
        alt: 'A picture of a boat',
        'aria-labelledby': 'swa-cool-div--label',
        className: 'swa-test-class',
        id: 'swa-cool-div',
        onClick: sinon.stub(),
        maxLength: 5
      };
      const props = _.assign({}, validProps, {
        dx: 10,
        myCoolProp: 'test'
      });

      expect(filterDOMProps(props)).to.deep.equal(validProps);
    });

    it('should not filter valid html attributes, including maxLength', () => {
      const validProps = {
        alt: 'A picture of a boat',
        'aria-labelledby': 'swa-cool-div--label',
        className: 'swa-test-class',
        id: 'swa-cool-div',
        onClick: sinon.stub(),
        src: 'images/swa',
        ref: 'swa-ref',
        'data-a': 'swa-data-a',
        'data-qa': 'swa-data-qa',
        maxLength: 5
      };

      expect(filterDOMProps(validProps)).to.deep.equal(validProps);
    });
  });

  context('when filtering dom props for a masked input', () => {
    it('should return an empty props object when it receives an empty props list', () => {
      expect(filterDOMPropsWithMask({})).to.deep.equal({});
    });

    it('should filter invalid html attributes from the props object', () => {
      const validProps = {
        alt: 'A picture of a boat',
        'aria-labelledby': 'swa-cool-div--label',
        className: 'swa-test-class',
        id: 'swa-cool-div',
        onClick: sinon.stub(),
        mask: '9',
        maskChar: '*',
        formatChars: { '9': '[0-9]' }
      };
      const props = _.assign({}, validProps, {
        dx: 10,
        myCoolProp: 'test'
      });

      expect(filterDOMPropsWithMask(props)).to.deep.equal(validProps);
    });

    it('should not filter valid html attributes', () => {
      const validProps = {
        alt: 'A picture of a boat',
        'aria-labelledby': 'swa-cool-div--label',
        className: 'swa-test-class',
        id: 'swa-cool-div',
        onClick: sinon.stub(),
        src: 'images/swa',
        ref: 'swa-ref',
        'data-a': 'swa-data-a',
        'data-qa': 'swa-data-qa',
        mask: '9',
        maskChar: '*',
        formatChars: { '9': '[0-9]' }
      };

      expect(filterDOMPropsWithMask(validProps)).to.deep.equal(validProps);
    });

    it('should filter maxLength as it is unnecessary with react-input-mask inputs and throws errors', () => {
      const validProps = {
        alt: 'A picture of a boat',
        'aria-labelledby': 'swa-cool-div--label',
        className: 'swa-test-class',
        id: 'swa-cool-div',
        onClick: sinon.stub(),
        src: 'images/swa',
        ref: 'swa-ref',
        'data-a': 'swa-data-a',
        'data-qa': 'swa-data-qa',
        mask: '9',
        maskChar: '*'
      };
      const validPropsWithMaxLength = { ...validProps, maxLength: '123' };

      expect(filterDOMPropsWithMask(validPropsWithMaxLength)).to.deep.equal(validProps);
    });
  });
});
