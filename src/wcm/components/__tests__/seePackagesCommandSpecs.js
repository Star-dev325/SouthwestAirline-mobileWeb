import React from 'react';
import { shallow } from 'enzyme';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import browser from 'src/shared/helpers/browserObject';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();

describe('See packages command', () => {
  const mockSwaVacationsUrl = 'https://res.southwestvacations.com/search/ExternalFormPost.aspx?cmpid=SWA-INPATH';
  const mockProps = {
    bounds: [new BoundDetailBuilder().build(), new BoundDetailBuilder().build()],
    searchRequest: new SearchForFlightsRequestBuilder().build(),
    commandProps: {
      utm_campaign: 'mockValue',
      utm_medium: 'mockValue',
      utm_source: 'mockValue',
      utm_term: 'mockValue',
      utm_content: 'mockValue'
    }
  };
  let mockPost, openInBrowserStub;
  let SeePackagesCommand;

  beforeEach(() => {
    mockPost = sinon.stub();
    openInBrowserStub = sinon.spy(browser.window, 'open');
    SeePackagesCommand = proxyquire('src/wcm/components/seePackagesCommand', {
      'src/shared/form/helpers/post': { default: mockPost },
      'src/shared/api/apiRoutes': {
        default: {
          swaVacationsUrl: mockSwaVacationsUrl
        }
      }
    }).default;
  });

  afterEach(() => {
    sandbox.restore();
    browser.window.open.restore();
  });

  it('should should open default url', () => {
    const wrapper = createComponent();

    click(wrapper.find('.see-packages'));

    expect(openInBrowserStub.args[0]).toMatchSnapshot();
  });

  it('should should open default url when isWebView is true', () => {
    const wrapper = createComponent({ isWebView: true });

    click(wrapper.find('.see-packages'));

    expect(openInBrowserStub.args[0]).toMatchSnapshot();
  });

  it('should send additional parameters in path url', () => {
    const updatedCommandProps = { ...mockProps.commandProps, additionalParam: 'mockValue' };
    const wrapper = createComponent({ commandProps: updatedCommandProps });

    click(wrapper.find('.see-packages'));

    expect(openInBrowserStub.args[0]).toMatchSnapshot();
  });

  it('should render the proper values for international flight', () => {
    const updatedBounds = [
      new BoundDetailBuilder().withInternationalDepartureFlight().build(),
      new BoundDetailBuilder().build()
    ];
    const wrapper = createComponent({ bounds: updatedBounds });

    click(wrapper.find('.see-packages'));

    expect(openInBrowserStub.args[0]).toMatchSnapshot();
  });

  it('should render the proper values for international flight when isWebView true', () => {
    const updatedBounds = [
      new BoundDetailBuilder().withInternationalDepartureFlight().build(),
      new BoundDetailBuilder().build()
    ];
    const wrapper = createComponent({ bounds: updatedBounds, isWebView: true });

    click(wrapper.find('.see-packages'));

    expect(openInBrowserStub.args[0]).toMatchSnapshot();
  });

  function createComponent(props = {}) {
    return shallow(
      <SeePackagesCommand {...mockProps} {...props}>
        {'test content'}
      </SeePackagesCommand>
    );
  }
});
