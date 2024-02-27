import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { click, enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import waitFor from 'test/unit/helpers/waitFor';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import CountryCodeList from 'src/shared/components/countryCodeList';

const sinon = sandbox.create();

describe('CountryCodeList', () => {
  let onCountryCodeSelectStub;
  let onCancelStub;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);
    onCountryCodeSelectStub = sinon.stub();
    onCancelStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call onCountryCodeSelect when select country code', () => {
    const component = createComponent();

    click(component.find('.searchable-list-code--item').at(1));
    expect(onCountryCodeSelectStub).to.have.been.calledWith({
      countryCode: 'AF'
    });
  });

  context('normal state', () => {
    it('should show country code list', () => {
      const component = createComponent();

      expect(component.find('.searchable-list-code--item')).to.have.lengthOf(233);
    });

    it('should show US as the first country code', () => {
      const component = createComponent();
      const USCountryCode = component.find('.searchable-list-code--item').at(0);

      expect(USCountryCode.find('.flex10')).to.have.text('United States of America - US');
    });

    it('should show title', () => {
      const component = createComponent();
      const pageHeader = component.find('PageHeaderWithButtons');

      expect(pageHeader).to.contain.text('Select Country');
    });
  });

  context('searchBar', () => {
    it('should not contain search bar when searchBar is false', () => {
      const component = createComponent(false);
      const searchBar = component.find('SearchBar');

      expect(searchBar).to.be.not.present();
    });

    context('searching state', () => {
      let searchInput;
      let component;

      beforeEach(() => {
        component = createComponent(true);
        searchInput = component.find('input');
      });

      it('should contain search bar when searchBar is true', () => {
        const searchBar = component.find('SearchBar');

        expect(searchBar).to.be.present();
      });

      it('should hide shadow mask by default', () => {
        expect(component).to.not.contain.className('options-list--with-shadow');
      });

      it('should filter the country list by the text', (done) => {
        enterText(searchInput, 'Armenia');
        searchInput.simulate('focus');

        waitFor.untilAssertPass(() => {
          const list = component.find('.searchable-list-code--item').find('li');

          expect(list).to.have.lengthOf(1);
        }, done);
      });

      it('should not display `no result`', () => {
        const noResultText = component.find('.searchable-list-code--empty');

        expect(noResultText).to.contain.className('hide');
      });

      it('should display `no result` when cannot find any country', (done) => {
        enterText(searchInput, 'Chengdu');
        searchInput.simulate('focus');

        waitFor.untilAssertPass(() => {
          const noResultText = component.find('.searchable-list-code--empty');

          expect(noResultText).to.not.contain.className('hide');
        }, done);
      });

      it('should not hide shadow mask when search bar focused', () => {
        searchInput.simulate('focus');

        const shadowMask = component.find('.options-list--results_shadow');

        expect(shadowMask).to.not.contain.className('hide');
      });

      it('should disable scroll behavior on shadow mask when search bar focused', (done) => {
        searchInput.simulate('focus');

        waitFor.untilAssertPass(() => {
          const shadowContainer = component.find('.options-list--results');

          expect(shadowContainer).to.contain.className('overflow-hidden');
        }, done);
      });

      it('should enable scroll behavior when enter text in search bar', (done) => {
        searchInput.simulate('focus');

        enterText(searchInput, 'Armenia');

        waitFor.untilAssertPass(() => {
          const shadowContainer = component.find('.options-list--results');

          expect(shadowContainer).to.contain.not.className('overflow-hidden');
        }, done);
      });
    });
  });

  const createComponent = (showSearchBarValue = true) => {
    const props = {
      onCountryCodeSelect: onCountryCodeSelectStub,
      onCancel: onCancelStub,
      showSearchBar: showSearchBarValue
    };

    return mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <CountryCodeList {...props} />
      </Provider>
    );
  };
});
