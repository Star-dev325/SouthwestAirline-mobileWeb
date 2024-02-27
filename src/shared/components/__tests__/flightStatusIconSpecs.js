import React from 'react';
import { shallow } from 'enzyme';
import { apiFlightStatusToCssClassMapping } from 'src/flightStatus/constants/apiFlightStatusToCssClassMapping';
import FlightStatusIcon from 'src/shared/components/flightStatusIcon';

describe('FlightStatusIcon', () => {
  const createComponent = (status) => shallow(<FlightStatusIcon status={status} />);

  context('loop through apiFlightStatusToCssClassMapping', () => {
    Object.getOwnPropertyNames(apiFlightStatusToCssClassMapping).forEach((apiStatus) => {
      const expectedClassName = apiFlightStatusToCssClassMapping[apiStatus];

      it(`should return '${expectedClassName}' when status is '${apiStatus}'`, (done) => {
        const component = createComponent(apiStatus);

        expect(component.find('span').first()).to.have.className(expectedClassName);
        done();
      });
    });
  });
});
