jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/check-in', reload: jest.fn() } }));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import { HazmatDeclarationPage } from 'src/checkIn/pages/hazmatDeclarationPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

describe('HazmatDeclarationPage', () => {
  let flights, pnr;
  let goBackStub;
  let replaceStub;
  let satelliteTrackStub;

  beforeEach(() => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    jest.spyOn(CheckInLocalStorageHelper, 'saveAcceptedHazmatDeclarations');
    flights = [
      {
        flightDate: '2020-03-23',
        travelerId: 'travelerId-01',
        travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01'
      }
    ];
    goBackStub = jest.fn();
    pnr = {
      firstName: 'Fred',
      lastName: 'Flint',
      recordLocator: 'PNR123'
    };
    replaceStub = jest.fn();
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createPageComponent();

    expect(container.querySelector('.hazmat-declaration-page')).toBeTruthy();
    expect(container.querySelector('button')).toBeTruthy();
    expect(container.querySelector('.hazmat-disagree')).toBeTruthy();
  });

  it('should call satellite with the hazardous materials acknowledgement string', () => {
    createPageComponent();

    expect(satelliteTrackStub).toBeCalledWith('hazardous materials acknowledgement');
  });

  it('should call replace with &clk=chkinhazyes query param when user clicks Continue button', () => {
    const { container } = createPageComponent();

    fireEvent.click(container.querySelector('button'));
    expect(CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations).toBeCalledWith(flights);
    expect(replaceStub).toBeCalledWith('/check-in/boarding-pass', null, { clk: 'chkinhazyes' }, pnr);
  });

  it('should call satellite with the hazardous materials acknowledgement declined string when user clicks Disagree', () => {
    const { container } = createPageComponent();

    fireEvent.click(container.querySelector('.hazmat-disagree'));

    expect(satelliteTrackStub).toBeCalledWith('hazardous materials acknowledgement declined');
  });

  it('should call goBack when user clicks Disagree', () => {
    const { container } = createPageComponent();

    fireEvent.click(container.querySelector('.hazmat-disagree'));

    expect(goBackStub).toBeCalled();
  });

  it('should have hazmat acknowledge link with &clk=chkinhazinfo query param', () => {
    const { container } = createPageComponent();

    expect(container.querySelector('a').getAttribute('href')).toBe('/hazardous-materials?clk=chkinhazinfo');
  });

  const createPageComponent = () => {
    const props = {
      replace: replaceStub,
      goBack: goBackStub,
      location: {
        state: {
          pnr,
          flights
        }
      }
    };

    return render(<HazmatDeclarationPage {...props} />);
  };
});
