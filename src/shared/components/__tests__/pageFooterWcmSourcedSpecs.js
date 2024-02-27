import { shallow } from 'enzyme';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import React from 'react';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import FakeClock from 'test/unit/helpers/fakeClock';

const TODAY = '2022-12-31';

describe('PageFooterWcmSourced', () => {
  let footerLinkRows;

  beforeEach(() => {
    FakeClock.setTimeTo(TODAY);
    footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;
  });

  afterEach(() => {
    FakeClock.restore();
  });
  
  context('render', () => {
    it('footer with copyright', () => {
      const component = createComponent();

      expect(component).toMatchSnapshot();
    });

    it('footer with copyright and Links when links are provided', () => {
      const component = createComponent({ footerLinkRows });

      expect(component).toMatchSnapshot();
    });

    it('with className when specified', () => {
      const component = createComponent({ className: 'some-class-name', footerLinkRows });

      expect(component).toMatchSnapshot();
    });
  });

  const createComponent = (props = { footerLinkRows: [] }) => shallow(<PageFooterWcmSourced {...props} />);
});
