import _ from 'lodash';
import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';

import { enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import waitFor from 'test/unit/helpers/waitFor';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();

describe('CountryList', () => {
  let countryListStub;
  let mockCountryListData;
  let countryList;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);

    countryListStub = sinon.stub();
    mockCountryListData = [
      {
        label: 'Austin - US',
        value: 'US'
      },
      {
        label: 'Mex - CN',
        value: 'CN'
      }
    ];
    countryListStub.returns(mockCountryListData);
    countryList = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('on cancel', () => {
    it('should call cancel when cancel button clicked', () => {
      const cancelStub = sinon.stub();

      countryList = createComponent({
        onCancel: cancelStub
      });
      const cancelButton = countryList.find('PageHeaderWithButtons').find('button.cancel');

      cancelButton.simulate('click');

      expect(cancelStub).to.be.called;
    });
  });

  context('onSelectedCountry', () => {
    it('should call cancel when cancel button clicked', () => {
      const selectedCountryStub = sinon.stub();

      countryList = createComponent({
        onSelectedCountry: selectedCountryStub
      });
      const cancelButton = countryList.find('.country-list-group').find('.country-list-item-container').at(0);

      cancelButton.simulate('click');

      expect(selectedCountryStub).to.be.calledWith('US');
    });
  });

  context('normal state', () => {
    beforeEach(() => {
      countryListStub = sinon.stub();
    });

    it('should show page header', () => {
      const pageHeaderWithButtons = countryList.find('PageHeaderWithButtons');

      expect(pageHeaderWithButtons).to.have.prop('hidden', false);
    });

    it('should contain search bar', () => {
      const searchBar = countryList.find('SearchBar');

      expect(searchBar).to.be.present();
    });

    it('should contain country list', () => {
      const list = countryList.find('.country-list-group').find('li');

      expect(list).to.have.lengthOf(2);
    });

    it('should not display no result', () => {
      const noResultText = countryList.find('.country-list--results_empty');

      expect(noResultText).to.contain.className('hide');
    });

    it('should hide shadow', () => {
      expect(countryList).to.not.contain.className('options-list--with-shadow');
    });
  });

  context('searching state', () => {
    let searchInput;

    beforeEach(() => {
      searchInput = countryList.find('input');
    });

    it('should display the shadow and disable the scroll behavior when get focus', () => {
      searchInput.simulate('focus');
      expect(countryList.find('.options-list--results_shadow')).to.present();
      expect(countryList).to.contain.className('options-list--with-shadow');
    });

    it('should filter the country list by the text', (done) => {
      enterText(searchInput, 'Austin');
      searchInput.simulate('focus');

      waitFor.untilAssertPass(() => {
        const list = countryList.find('.country-list-group').find('li');

        expect(list).to.have.lengthOf(1);
      }, done);
    });

    it('should display no result', (done) => {
      enterText(searchInput, 'SiChuan');
      searchInput.simulate('focus');

      waitFor.untilAssertPass(() => {
        const noResultText = countryList.find('.country-list--results_empty');

        expect(noResultText).to.not.contain.className('hide');
      }, done);
    });
  });

  context('isoCountryCode', () => {
    it('should display selected icon when isoCountryCode is `US`', () => {
      countryList = createComponent({ selectedIsoCountryCode: 'US' });
      expect(countryList.find('.country-list--results').find('Icon')).to.have.lengthOf(1);
    });

    it('should display selected icon when isoCountryCode is a function and return `US`', () => {
      countryList = createComponent({ selectedIsoCountryCode: () => 'US' });
      expect(countryList.find('.country-list--results').find('Icon')).to.have.lengthOf(1);
    });

    it('should hidden selected icon when isoCountryCode is empty', () => {
      countryList = createComponent({ selectedIsoCountryCode: '' });
      expect(countryList.find('.country-list--results').find('Icon')).to.have.lengthOf(0);
    });

    it('should hidden selected icon when isoCountryCode is undefined', () => {
      countryList = createComponent();
      expect(countryList.find('.country-list--results').find('Icon')).to.have.lengthOf(0);
    });
  });

  const createComponent = (props = {}) => {
    const mockHelper = {
      getCountryOptions: countryListStub
    };
    const defaultProps = {
      title: 'title'
    };

    const CountryList = proxyquire('src/shared/components/countryList', {
      'src/shared/helpers/optionsHelper': mockHelper
    }).default;

    return mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <CountryList {..._.merge(defaultProps, props)} />
      </Provider>
    );
  };
});
