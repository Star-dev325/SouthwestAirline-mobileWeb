import _ from 'lodash';
import React from 'react';
import withCheckInAPISPage from 'src/checkIn/enhancers/withCheckInAPISPage';
import { integrationMount } from 'test/unit/helpers/testUtils';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

describe('withCheckInAPISPage', () => {
  const FakeComponent = (props) => (
    <div>
      <button onClick={_.get(props, 'onCancel')} />
      <button onClick={_.get(props, 'onSubmit')} />
    </div>
  );
  const CheckInAPISPage = withCheckInAPISPage({
    nodeName: 'nodeName',
    formId: 'formId'
  })(FakeComponent);

  it('should render child form component when page data empty', () => {
    const wrapper = renderComponent(CheckInAPISPage);

    expect(wrapper.find('NodeNamePage')).to.exist;
    expect(wrapper.find('FakeComponent')).to.have.props({ initialFormData: undefined, formId: 'formId' });
  });

  it('should go back when click on cancel', () => {
    const pageData = {
      type: 'RESIDENT_ALIEN_CARD',
      number: 'abc-d22-222-222-222',
      issuedBy: 'AS',
      expiration: '2019-11-17'
    };

    const wrapper = renderComponent(CheckInAPISPage, pageData);

    click(wrapper.find('button').at(0));
    expect(wrapper.instance().props.history.location.pathname).to.equal('/previousPath');
  });

  it('should pass page data to child form component when page data not empty', () => {
    const pageData = {
      type: 'RESIDENT_ALIEN_CARD',
      number: 'abc-d22-222-222-222',
      issuedBy: 'AS',
      expiration: '2019-11-17'
    };

    const wrapper = renderComponent(CheckInAPISPage, pageData);

    expect(wrapper.find('FakeComponent')).to.have.props({ initialFormData: pageData, formId: 'formId' });
  });

  context('Contact Tracing', () => {
    const pageData = {
      type: 'RESIDENT_ALIEN_CARD'
    };
    const ContactTracingCheckInAPISPage = withCheckInAPISPage({
      nodeName: 'nodeName',
      formId: 'formId',
      transformAdditionalProps: (document) => ({ document })
    })(FakeComponent);

    it('should support additionalProps transform', () => {
      const wrapper = renderComponent(ContactTracingCheckInAPISPage, pageData);
      const component = wrapper.find('FakeComponent');

      expect(component).to.have.props({ formId: 'formId' });
      expect(component.props().document).to.deep.equal({
        additionalPassportPageFormData: {
          nodeName: {
            type: 'RESIDENT_ALIEN_CARD'
          }
        }
      });
    });
  });

  const renderComponent = (CheckInAPISPage, pageData) => {
    const initialState = {};

    pageData &&
      _.set(
        initialState,
        'app.checkIn.checkInFlowData.travelDocuments.0.additionalPassportPageFormData.nodeName',
        pageData
      );

    return integrationMount({
      location: '/check-in/1/additional-passport-info/green-card',
      path: '/check-in/:paxNumber/additional-passport-info/green-card'
    })(initialState, CheckInAPISPage);
  };
});
