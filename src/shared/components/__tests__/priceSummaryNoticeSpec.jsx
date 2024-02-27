import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import ContentLink from 'src/shared/components/contentLink';
import { shallow } from 'enzyme';
import React from 'react';

const fareRulesWithLinks =
  'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.';

describe('PriceSummaryNotice', () => {
  context('render', () => {
    it('should render with default props', () => {
      const comp = shallow(<PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />);

      expect(comp.find(ContentLink)).to.have.props({ raw: fareRulesWithLinks });
    });
  });
});
