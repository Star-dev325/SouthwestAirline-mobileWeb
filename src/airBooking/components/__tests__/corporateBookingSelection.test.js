import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CorporateBookingSelection } from 'src/airBooking/components/corporateBookingSelection';
import { sitePaths } from 'src/shared/constants/siteLinks';

describe('CorporateBookingSelection', () => {
  const mockCompanyName = 'Dunder Mifflin Paper Company';
  const mockCorporateSwitchInfo = {
    label: 'Book with a SWABIZ account',
    learnMoreUrl: 'corporate/url',
    nonCorporateLearnMoreUrl: 'non/corporate/url'
  };
  const activeCompanyIdMockInfo = { companyId: '99587574', companyName: mockCompanyName };
  const selectedCompanyNameMockInfo = { selectedCompanyName: mockCompanyName };
  let saveSelectedCompanyFnMock;
  let removeSelectedCompanyFnMock;
  let transitionToSelectCompanyPageFnMock;
  let pushMock;

  describe('when rendering corporate booking selection', () => {
    beforeEach(() => {
      saveSelectedCompanyFnMock = jest.fn().mockResolvedValue({});
      removeSelectedCompanyFnMock = jest.fn().mockResolvedValue({});
      transitionToSelectCompanyPageFnMock = jest.fn().mockResolvedValue({});
      pushMock = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render all elements', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    describe('when associated to one company', () => {
      it('should push to learn more swabiz page', () => {
        const { container } = createComponent({ activeCompanyIdAssociations: [activeCompanyIdMockInfo] });

        fireEvent.click(container.querySelector('.corporate-booking-selection--learn-more'));

        expect(pushMock).toHaveBeenCalledWith(`${sitePaths.learnMoreSwabiz}?CLK=swabizomnilearnmore`);
      });

      it('should render company name', () => {
        const { container } = createComponent(selectedCompanyNameMockInfo);

        expect(container).toMatchSnapshot();
      });

      it('should save selected company when toggle switch is checked', () => {
        const { container } = createComponent({ activeCompanyIdAssociations: [activeCompanyIdMockInfo] });

        fireEvent.click(container.querySelector('.toggle-switch'));

        expect(saveSelectedCompanyFnMock).toHaveBeenCalledWith(activeCompanyIdMockInfo);
      });

      it('should remove selected company when toggle switch is unchecked', () => {
        const instance = React.createRef();

        createComponent({ ref: instance });
  
        instance.current._handleToggleSwitchChange(false);
  
        expect(removeSelectedCompanyFnMock).toHaveBeenCalled();
      });
    });

    describe('when associated to multiple companies', () => {
      it('should navigate to select-company page and not save selected company', () => {
        const mockProps = {
          activeCompanyIdAssociations: [
            { companyId: '99999999', companyName: 'Company One' },
            { companyId: '88888888', companyName: 'Company Two' }
          ]
        };

        const { container } = createComponent(mockProps);

        fireEvent.click(container.querySelector('.toggle-switch'));

        expect(transitionToSelectCompanyPageFnMock).toHaveBeenCalled();
        expect(saveSelectedCompanyFnMock).not.toHaveBeenCalled();
      });
    });

    describe('when not associated to any companies', () => {
      it('should push to learn more swabiz not associated page', () => {
        const { container } = createComponent({ activeCompanyIdAssociations: [] });

        fireEvent.click(container.querySelector('.toggle-switch'));

        expect(pushMock).toHaveBeenCalledWith(`${sitePaths.learnMoreSwabizNotAssociated}?CLK=swabizomnitoggle`);
        expect(saveSelectedCompanyFnMock).not.toHaveBeenCalled();
      });
    });

    describe('when with lap child', () => {
      it('swabiz toggle should be unchecked and disabled', () => {
        const { container } = createComponent({ selectedCompanyName: mockCompanyName, hasLapChild: true });

        fireEvent.click(container.querySelector('.toggle-switch'));

        expect(removeSelectedCompanyFnMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
      });
    });

    describe('when with out lap child', () => {
      it('swabiz toggle should not be checked and should not be disabled', () => {
        const { container } = createComponent({ selectedCompanyName: undefined, hasLapChild: false });

        fireEvent.click(container.querySelector('.toggle-switch'));

        expect(removeSelectedCompanyFnMock).not.toHaveBeenCalled();
        expect(container).toMatchSnapshot();
      });
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      corporateBookingSwitchInfo: mockCorporateSwitchInfo,
      activeCompanyIdAssociations: [],
      hasLapChild: false,
      push: pushMock,
      saveSelectedCompanyFn: saveSelectedCompanyFnMock,
      removeSelectedCompanyFn: removeSelectedCompanyFnMock,
      transitionToSelectCompanyPageFn: transitionToSelectCompanyPageFnMock
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(<CorporateBookingSelection {...newProps} />);
  };
});
