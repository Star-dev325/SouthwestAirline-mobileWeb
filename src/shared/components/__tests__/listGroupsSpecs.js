import _ from 'lodash';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import React from 'react';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

describe('list groups component', () => {
  let ListGroups;

  const getAlphabetStub = sinon.stub().returns([...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ']);
  const scrollToHeaderStub = sinon.stub().returns(sinon.stub());

  beforeEach(() => {
    ListGroups = proxyquire('src/shared/components/listGroups', {
      'src/shared/helpers/alphabetSelectorHelper': { scrollToHeader: scrollToHeaderStub, getAlphabet: getAlphabetStub }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should display multiple listGroup component', () => {
    const instance = createComponent({ showSectionHeaders: true });

    expect(instance.find('ListGroup')).to.have.lengthOf(2);
  });

  it('should sort and group the list', () => {
    const instance = createComponent();

    const listGroups = instance.find('ListGroup');

    expect(listGroups.at(0).find('.list-group-header')).to.contain.text('F');
    expect(listGroups.at(1).find('.list-group-header')).to.contain.text('S');
  });

  it('should use custom groupByFn if provided by props', () => {
    const groupByFnStub = sinon.stub();

    createComponent({ groupByFn: groupByFnStub });
    expect(groupByFnStub).to.have.been.called;
  });

  context('when item card is clicked', () => {
    it('should invoke callback function', () => {
      const onItemSelectStub = sinon.stub();
      const instance = createComponent({ onItemSelect: onItemSelectStub });

      instance.find('.item-label').at(0).simulate('click');
      expect(onItemSelectStub).to.have.been.calledWith(_.find(ITEMS, { code: 'First Ghost Card' }));
    });
  });

  context('Alphabet Selector', () => {
    it('should invoke scrollTo prop', () => {
      const instance = createComponent({ showAlphabetSelector: true });

      const alphabetSelector = instance.find('AlphabetSelector');

      alphabetSelector.props().scrollTo('header');

      const airportGroups = instance.find('ListGroup');
      const airportGroupsRefs = scrollToHeaderStub.getCall(0).args[0];

      expect(scrollToHeaderStub).to.have.been.called;
      expect(airportGroups.at(0).getDOMNode().textContent).to.equal(airportGroupsRefs['F'].textContent);
      expect(airportGroups.at(1).getDOMNode().textContent).to.equal(airportGroupsRefs['S'].textContent);
    });

    it('should display alphabet', () => {
      const instance = createComponent({ showAlphabetSelector: true });

      const alphabetLetters = instance.find('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters.map((div) => div.text())).to.deep.equal(getAlphabetStub.getCall(0).returnValue);
    });

    it('should not display', () => {
      const instance = createComponent({ showAlphabetSelector: false });

      const alphabetLetters = instance.find('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters).to.have.lengthOf(0);
    });

    it('should group items under # if the label starts with number', () => {
      const instance = createComponent({ items: ITEMS_WITH_NUMBER });

      const listGroups = instance.find('ListGroup');

      expect(listGroups.at(0).find('.list-group-header')).to.contain.text('#');
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      items: ITEMS,
      showAlphabetSelector: true,
      onItemSelect: sinon.stub()
    };

    return mount(<ListGroups {..._.merge(defaultProps, props)} />);
  };

  const ITEMS_WITH_NUMBER = [
    {
      code: '1st Ghost Card',
      label: '1st Ghost Card'
    },
    {
      code: '2nd Ghost Card',
      label: '2nd Ghost Card'
    }
  ];

  const ITEMS = [
    {
      code: 'First Ghost Card',
      label: 'First Ghost Card'
    },
    {
      code: 'Second Ghost Card',
      label: 'Second Ghost Card'
    }
  ];
});
