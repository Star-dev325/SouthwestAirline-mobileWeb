import React from 'react';
import { shallow } from 'enzyme';
import TabContent from 'src/shared/components/detachedTabContent';

describe('DetachedTabContent', () => {
  context('when one tab is active', () => {
    it('should only render that tab', () => {
      const tabContent = shallow(
        <TabContent active={1}>
          <div>not active</div>
          <div>active</div>
        </TabContent>
      );

      expect(tabContent).to.have.text('active');
    });
  });
});
