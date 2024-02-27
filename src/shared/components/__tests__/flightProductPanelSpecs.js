import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import FlightProductPanel from 'src/shared/components/flightProductPanel';
import * as TransitionEndEventsHelper from 'src/shared/helpers/transitionEndEventsHelper';

const sinon = sandbox.create();

describe('flightProductPanel', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should not render header when header prop does not exist', () => {
    const panel = createComponent({});

    expect(panel.find('[data-qa="flight-product-panel-header"]')).to.not.exist;
  });

  it('should render header when header prop does exist', () => {
    const header = <div className={'header-class'} />;
    const panel = createComponent({ header });

    expect(panel.find('.flight-product-panel_collapsing')).to.exist;
    expect(panel.find('.header-class')).to.exist;
  });

  context('componentDidUpdate', () => {
    let addEndEventListenerStub;
    let removeEndEventListenerStub;

    beforeEach(() => {
      addEndEventListenerStub = sinon.stub(TransitionEndEventsHelper, 'addEndEventListener');
      removeEndEventListenerStub = sinon.stub(TransitionEndEventsHelper, 'removeEndEventListener');
    });

    it('should call event handlers if expanded is true', () => {
      createComponent({ expanded: true });

      expect(addEndEventListenerStub).to.have.been.called;
    });

    it('should call remove event handlers if expanded is true and addEndEventListener is complete', () => {
      addEndEventListenerStub.callsArg(1);
      createComponent({ expanded: true });

      expect(removeEndEventListenerStub).to.have.been.called;
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      className: 'example-classname',
      expanded: true,
      onSelect: _.noop,
      children: <div />
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return mount(<FlightProductPanel {...mergedProps} />);
  };
});
