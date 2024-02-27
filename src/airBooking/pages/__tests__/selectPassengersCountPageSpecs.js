import React from 'react';
import { sandbox } from 'sinon';
import _ from 'lodash';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { SelectPassengersCountPage } from 'src/airBooking/pages/selectPassengersCountPage';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import * as FormDataActions from 'src/shared/actions/formDataActions';

const sinon = sandbox.create();

describe('SelectPassengersCountPage', () => {
  let goBackStub, savePassengerCountFnStub, updateFormFieldDataValueFnStub;

  beforeEach(() => {
    savePassengerCountFnStub = sinon.stub();
    updateFormFieldDataValueFnStub = sinon.stub(FormDataActions, 'updateFormFieldDataValue');
    goBackStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('render', () => {
    it('should render correctly', () => {
      const props = {
        match: 'this/is/path/to/selectPassengersCountPage',
        location: {
          search: 'text'
        }
      };
      const wrapper = createComponent(props);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('click on plus button', () => {
    it('should show passenger count to 2 and baby-on-board text should not be visible when clicked on plus button for passenger item', () => {
      const props = {
        match: 'this/is/path/to/selectPassengersCountPage',
        location: {
          search: 'text'
        }
      };
      const wrapper = createComponent(props);

      const passengerListItemSelector = (index = 0) =>
        wrapper.find('.select-passengers-count-page--list-item').at(index);

      click(passengerListItemSelector().find('Button').at(1));

      expect(wrapper).toMatchSnapshot();
    });

    it('should show child count to 1 and baby-on-board text when clicked on plus button for child item', () => {
      const props = {
        match: 'this/is/path/to/selectPassengersCountPage',
        location: {
          search: 'text'
        }
      };
      const wrapper = createComponent(props);

      const passengerListItemSelector = (index = 0) =>
        wrapper.find('.select-passengers-count-page--list-item').at(index);

      click(passengerListItemSelector(1).find('Button').at(1));

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('click done', () => {
    it('should update form fields, save passenger count, and go back to previous screen', () => {
      const props = {
        match: 'this/is/path/to/selectPassengersCountPage',
        location: {
          search: 'text'
        }
      };
      const wrapper = createComponent(props);

      click(wrapper.find('PageHeaderWithButtons').find('.action-bar-buttons--item').first().find('button'));

      expect(updateFormFieldDataValueFnStub).to.have.been.called;
      expect(savePassengerCountFnStub).to.have.been.called;
      expect(goBackStub).to.have.been.called;
    });
  });

  const providerStore = configureMockStore()({
    app: {
      airBooking: {
        passengerCountData: {
          lapChildCount: 0,
          adultCount: 1,
          valueUpdated: false
        }
      }
    }
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      goBack: goBackStub,
      savePassengerCountFn: savePassengerCountFnStub,
      updateFormFieldDataValueFn: updateFormFieldDataValueFnStub,
      passengerCountData: {
        lapChildCount: 0,
        adultCount: 1,
        valueUpdated: false
      }
    };

    return mount(
      <Provider store={providerStore}>
        <SelectPassengersCountPage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
