import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import ConfirmationDetails from 'src/shared/components/confirmationDetails';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();

describe('ConfirmationDetails', () => {
  let confirmationDetails;
  let onViewBoardingPassButtonClickCbStub;
  let flights;

  beforeEach(() => {
    flights = [
      {
        boundIndex: 0,
        flightNumber: '181',
        hasWifi: true,
        travelTime: '0h 55m',
        gate: '---',
        passengers: [
          {
            confirmationNumber: '123ABC',
            name: 'Wilma Flintstone',
            mobileBoardingPassEligible: true,
            _links: {
              viewPassengerBoardingPass: {
                body: {
                  firstName: 'Wilma',
                  lastName: 'Flintstone',
                  travelerID: ['2301DC640000E12B']
                },
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/123ABC',
                method: 'POST',
                labelText: 'button text'
              }
            }
          }
        ]
      },
      {
        boundIndex: 0,
        flightNumber: '191',
        hasWifi: true,
        travelTime: '0h 55m',
        gate: '---',
        passengers: []
      },
      {
        boundIndex: 1,
        flightNumber: '201',
        hasWifi: true,
        travelTime: '0h 55m',
        gate: '---',
        passengers: []
      }
    ];

    onViewBoardingPassButtonClickCbStub = sinon.stub();

    confirmationDetails = mount(
      <ConfirmationDetails
        flights={flights}
        isReturning={false}
        onViewBoardingPassButtonClickCb={onViewBoardingPassButtonClickCbStub}
        UPGRADED_BOARDING={false}
        onUpgradedBoardingButtonClick={() => {}}
      />
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should group flights by boundIndex and render boundCheckInCard', () => {
    const boundCheckInCards = confirmationDetails.find('BoundCheckInCard');

    expect(boundCheckInCards).to.have.length(2);
    expect(boundCheckInCards.at(0))
      .to.have.prop('boundCheckInInfo')
      .to.deep.equal([
        {
          boundIndex: 0,
          flightNumber: '181',
          hasWifi: true,
          travelTime: '0h 55m',
          gate: '---',
          passengers: flights[0].passengers
        },
        {
          boundIndex: 0,
          flightNumber: '191',
          hasWifi: true,
          travelTime: '0h 55m',
          gate: '---',
          passengers: []
        }
      ]);
    expect(boundCheckInCards.at(1))
      .to.have.prop('boundCheckInInfo')
      .to.deep.equal([
        {
          boundIndex: 1,
          flightNumber: '201',
          hasWifi: true,
          travelTime: '0h 55m',
          gate: '---',
          passengers: []
        }
      ]);
  });

  it('should trigger onViewBoardingPassButtonClickCb when the viewBoardingPass button clicked', () => {
    click(confirmationDetails.find('[title="button text"]').at(0));

    expect(onViewBoardingPassButtonClickCbStub).to.have.been.calledWith({
      firstName: 'Wilma',
      lastName: 'Flintstone',
      recordLocator: '123ABC'
    });
  });
});
