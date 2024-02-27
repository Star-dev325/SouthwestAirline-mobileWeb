import _ from 'lodash';
import { SelectCompanyPage } from 'src/airBooking/pages/selectCompanyPage';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';
import waitFor from 'test/unit/helpers/waitFor';

const mockCompanyAssociations = [
  { companyId: '99777777', companyName: 'Hamlin, Hamlin & McGill' },
  { companyId: '99666666', companyName: 'Los Pollos Hermanos' },
  { companyId: '99555555', companyName: 'Madrigal Electromotive' },
  { companyId: '99444444', companyName: 'Mesa Verde Bank' },
  { companyId: '99333333', companyName: 'Saul Goodman & Associates' },
  {
    companyId: '99222222',
    companyName: 'The Mary Poppins School of Super Long Supercalifragilisticexpialidocious Musicals'
  }
];

describe('SelectCompanyPage', () => {
  const sinon = sandbox.create();
  let goBackStub;
  let saveSelectedCompanyFnStub;
  let wrapper;

  beforeEach(() => {
    goBackStub = sinon.stub();
    saveSelectedCompanyFnStub = sinon.stub().returns(Promise.resolve({}));
    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render company name and cid for each associated company', () => {
    mockCompanyAssociations.forEach((company, index) => {
      expect(wrapper.find('.select-company-page--company-name').at(index).text()).to.contain(company.companyName);
      expect(wrapper.find('.select-company-page--company-id').at(index).text()).to.contain(company.companyId);
    });
  });

  context('when cancel button is clicked', () => {
    beforeEach(() => {
      click(wrapper.find('PageHeaderWithButtons button').at(0));
    });

    it('should go back to previous page', () => {
      expect(goBackStub).to.have.been.called;
    });

    it('should not save a selected company', () => {
      expect(saveSelectedCompanyFnStub).to.not.have.been.called;
    });
  });

  context('when select a company', () => {
    it('should go to shopping page', (done) => {
      click(wrapper.find('.select-company-page--company-selection-card').at(0));

      waitFor.untilAssertPass(() => {
        expect(goBackStub).to.have.been.called;
      }, done);
    });

    it('should disable storing retry function if token is no longer valid', (done) => {
      // should not go to shopping page if next action is not allowed. (This scenario happens when user is on BAF page
      // and session is expired, then they click on swabiz switch and try to select company. we disable retry
      // function after user reLogin because token is no longer valid, and we prevent user from going back to BAF page,
      // because they need to reselect the company)
      saveSelectedCompanyFnStub.returns({ then: sinon.stub().returns({ stopNextAction: true }) });
      click(wrapper.find('.select-company-page--company-selection-card').at(0));

      waitFor.untilAssertPass(() => {
        expect(goBackStub).to.not.have.been.called;
      }, done);
    });

    it('should save a selected company if company was selected', (done) => {
      click(wrapper.find('.select-company-page--company-selection-card').at(0));

      waitFor.untilAssertPass(() => {
        expect(saveSelectedCompanyFnStub).to.have.been.called;
      }, done);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      activeCompanyIdAssociations: mockCompanyAssociations,
      goBack: goBackStub,
      saveSelectedCompanyFn: saveSelectedCompanyFnStub
    };

    const store = createMockStoreWithRouterMiddleware()();

    return mount(
      <Provider store={store}>
        <SelectCompanyPage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
