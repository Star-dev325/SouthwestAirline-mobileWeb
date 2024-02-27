import React from 'react';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

import WcmStyledPageMenu from 'src/wcm/components/wcmStyledPageMenu';
import { shallow } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

describe('WcmStyledPageMenu component', () => {
  let onClickStub;
  let component;

  beforeEach(() => {
    onClickStub = sinon.stub();
    component = shallow(
      <WcmStyledPageMenu
        type="menu"
        linkType="app"
        target="airbooking"
        image="test.png"
        altText="test"
        onClick={onClickStub}
      />
    );
  });

  it('should render an img with correct props', () => {
    expect(component.find('img')).to.have.props({
      src: 'test.png',
      alt: 'test'
    });
  });

  it('should trigger onClick callback after user click the component', () => {
    click(component);

    expect(onClickStub).have.been.calledWith({
      link_type: 'app',
      target: 'airbooking'
    });
  });
});
