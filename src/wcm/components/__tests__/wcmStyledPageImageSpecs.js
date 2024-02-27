import React from 'react';
import { shallow } from 'enzyme';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';

describe('WcmStyledPageImage', () => {
  it('should always have a "fit" css-class', () => {
    const image = shallow(<WcmStyledPageImage image="something.png" className="some custom classes" />);

    expect(image.find('img')).to.have.className('fit');
  });
});
