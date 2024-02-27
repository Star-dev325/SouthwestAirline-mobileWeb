jest.mock('src/shared/api/apiRoutes');
jest.mock('src/shared/config/appConfig', () => ({
  SWA_VACATIONS_URL: 'https://res.southwestvacations.com/search/ExternalFormPost.aspx?cmpid=SWA-INPATH',
  userCanChangeToggles: jest.fn().mockRejectedValue(true)
}));
jest.mock('src/shared/form/helpers/post');
jest.mock('src/shared/helpers/browserObject', () => ({
  location: {
    pathname: 'https://res.southwestvacations.com/search/ExternalFormPost.aspx?cmpid=SWA-INPATH'
  },
  window: {
    open: jest.fn()
  }
}));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import browser from 'src/shared/helpers/browserObject';
import SeePackagesCommand from 'src/wcm/components/seePackagesCommand';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';

describe('See packages command', () => {
  const mockProps = {
    bounds: [new BoundDetailBuilder().build(), new BoundDetailBuilder().build()],
    commandProps: {
      utm_campaign: 'mockValue',
      utm_content: 'mockValue',
      utm_medium: 'mockValue',
      utm_source: 'mockValue',
      utm_term: 'mockValue'
    },
    searchRequest: new SearchForFlightsRequestBuilder().build()
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should should open default url', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.see-packages'));

    expect(browser.window.open.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should should open default url when isWebView is true', () => {
    const { container } = createComponent({ isWebView: true });

    fireEvent.click(container.querySelector('.see-packages'));

    expect(browser.window.open.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should send additional parameters in path url', () => {
    const updatedCommandProps = { ...mockProps.commandProps, additionalParam: 'mockValue' };
    const { container } = createComponent({ commandProps: updatedCommandProps });

    fireEvent.click(container.querySelector('.see-packages'));

    expect(browser.window.open.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should render the proper values for international flight', () => {
    const updatedBounds = [
      new BoundDetailBuilder().withInternationalDepartureFlight().build(),
      new BoundDetailBuilder().build()
    ];
    const { container } = createComponent({ bounds: updatedBounds });

    fireEvent.click(container.querySelector('.see-packages'));

    expect(browser.window.open.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should render the proper values for international flight when isWebView true', () => {
    const updatedBounds = [
      new BoundDetailBuilder().withInternationalDepartureFlight().build(),
      new BoundDetailBuilder().build()
    ];
    const { container } = createComponent({ bounds: updatedBounds, isWebView: true });

    fireEvent.click(container.querySelector('.see-packages'));

    expect(browser.window.open.mock.calls[0][0]).toMatchSnapshot();
  });

  const createComponent = (props = {}) => render(
    <SeePackagesCommand {...mockProps} {...props}>
      {'test content'}
    </SeePackagesCommand>
  );
});
