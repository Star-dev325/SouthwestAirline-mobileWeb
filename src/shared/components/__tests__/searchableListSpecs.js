import _ from 'lodash';
import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { click, enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import waitFor from 'test/unit/helpers/waitFor';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import SearchableList from 'src/shared/components/searchableList';

const sinon = sandbox.create();

describe('SearchableList', () => {
  let onItemSelectStub;
  let onCancelStub;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);
    onItemSelectStub = sinon.stub();
    onCancelStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call onItemSelectStub with key specified with prop codeFieldName when select list item', () => {
    const component = createComponent();

    click(component.find('.searchable-list-code--item').at(1));
    expect(onItemSelectStub).to.have.been.calledWith({
      theCode: '2'
    });
  });

  context('normal state', () => {
    it('should show the list', () => {
      const component = createComponent();

      expect(component.find('.searchable-list-code--item')).to.have.lengthOf(3);
    });

    it("should show 'Label One' as the first list item", () => {
      const component = createComponent();
      const USCountryCode = component.find('.searchable-list-code--item').at(0);

      expect(USCountryCode.find('.flex10')).to.have.text('Label One');
    });

    it('should show title', () => {
      const component = createComponent();
      const pageHeader = component.find('PageHeaderWithButtons');

      expect(pageHeader).to.contain.text('Modal Search Title');
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

      it('should filter the list by the text', (done) => {
        enterText(searchInput, 'Two');
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
        enterText(searchInput, '1');
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

        enterText(searchInput, 'Two');

        waitFor.untilAssertPass(() => {
          const shadowContainer = component.find('.options-list--results');

          expect(shadowContainer).to.contain.not.className('overflow-hidden');
        }, done);
      });
    });
  });

  context('Cancel Button', () => {
    it('should call onCancel function when Cancel button is pressed', () => {
      const component = createComponent();
      const cancelButton = component.find('button');

      click(cancelButton);
      expect(onCancelStub).to.have.been.called;
    });
  });

  context('when showSectionHeaders is true', () => {
    it('should show list group container', () => {
      const component = createComponent(true, { showSectionHeaders: true });
      const listGroupContainer = component.find('.list-group-container');

      expect(listGroupContainer).to.be.present();
    });
  });

  context('when alternateItemAllowed is true', () => {
    it('should show NavItemLink', () => {
      const component = createComponent(true, { showSectionHeaders: true, alternateItemAllowed: true });

      expect(component.find('NavItemLink')).to.be.present();
    });

    it('should provide correct props to NavItemLink', () => {
      const alternateNavItemLinkProps = {
        className: 'nav-class-name'
      };
      const component = createComponent(true, {
        showSectionHeaders: true,
        alternateItemAllowed: true,
        alternateNavItemLinkProps
      });

      expect(component.find('NavItemLink').find('.nav-class-name')).to.be.present();
    });

    it('should show the correct title for NavItemLink', () => {
      const alternateNavItemTitle = 'Nav Link Title';
      const component = createComponent(true, {
        showSectionHeaders: true,
        alternateItemAllowed: true,
        alternateNavItemTitle
      });

      expect(component.find('NavItemLink').find('.searchable-list--alternate-item-title')).to.have.text(
        alternateNavItemTitle
      );
    });
  });

  const createComponent = (showSearchBarValue = true, props = {}) => {
    const defaultProps = {
      title: 'Modal Search Title',
      itemList: [
        { label: 'Label One', code: '1' },
        { label: 'Label Two', code: '2' },
        { label: 'Label Three', code: '3' }
      ],
      onItemSelect: onItemSelectStub,
      onCancel: onCancelStub,
      showSearchBar: showSearchBarValue,
      codeFieldName: 'theCode'
    };

    return mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <SearchableList {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
