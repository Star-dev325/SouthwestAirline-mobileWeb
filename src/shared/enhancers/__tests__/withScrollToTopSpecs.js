import withScrollToTop from 'src/shared/enhancers/withScrollToTop';
import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import BrowserObject from 'src/shared/helpers/browserObject';
import waitFor from 'test/unit/helpers/waitFor';

const { document } = BrowserObject;

const sinon = sinonModule.sandbox.create();

describe('withScrollToTop', () => {
  const initialLocation = {
    hash: '',
    key: 'wenwfa',
    pathname: '/air/booking/passenger/0/passport',
    search: '?passengerName=Ron%20Hackmann',
    state: undefined
  };

  beforeEach(() => {
    const mockApp = {
      scrollTop: 755
    };

    sinon.stub(document, 'querySelector').withArgs('.app__contents').returns(mockApp);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should pass props to component', () => {
    const fakeProps = { fakeProp: 'fakeProp' };
    const wrapper = createComponent(fakeProps);

    expect(wrapper.find('FakeComponent')).to.have.prop('fakeProp').to.equal('fakeProp');
  });

  it('should scroll to top when prop is different from previously', (done) => {
    const wrapper = createComponent();

    wrapper.setProps({
      location: {
        hash: '',
        key: 'xxxxxx',
        pathname: '/air/booking/passenger/0',
        search: '',
        state: undefined
      }
    });
    waitFor.untilAssertPass(() => expect(document.querySelector('.app__contents').scrollTop).to.equal(0), done);
  });

  it('should not scroll to top when prop is no difference from previously', () => {
    const wrapper = createComponent();

    wrapper.setProps({ location: initialLocation });
    expect(document.querySelector('.app__contents').scrollTop).to.equal(755);
  });

  function createComponent(props) {
    const FakeComponent = () => <div className={'app__contents'} />;

    const WithFeatureTogglesComponent = withScrollToTop(FakeComponent);

    return mount(<WithFeatureTogglesComponent {...props} location={initialLocation} />);
  }
});
