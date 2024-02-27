import React from 'react';
import { shallow } from 'enzyme';
import Footnotes from 'src/shared/components/footnotes';
import { disclaimers } from 'mocks/templates/productDefinitions';
import ContentLink from 'src/shared/components/contentLink';

describe('Footnotes', () => {
  context('render', () => {
    it('should create a footnotes component with two disclaimers', () => {
      const wrapper = shallow(<Footnotes footnotes={disclaimers} />);

      expect(wrapper.find('.footnotes')).to.exist;
      expect(wrapper.find('.footnote').length).to.equal(2);
      let footNote = wrapper.find('.footnote').at(0);

      expect(footNote.find(ContentLink).props().raw).to.contain(
        '* First and second checked bags. Weight and size limits apply'
      );
      expect(footNote.find(ContentLink).props().raw).to.contain('/baggage-restrictions');
      expect(footNote.find('[data-qa="footnote-prefix"]')).not.to.present();

      footNote = wrapper.find('.footnote').at(1);
      expect(footNote.find(ContentLink).props().raw).to.contain('Fare difference may apply');
      expect(footNote.find('[data-qa="footnote-prefix"]').text()).to.equal('**');
    });
  });
});
