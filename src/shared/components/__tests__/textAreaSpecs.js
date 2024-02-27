import React from 'react';
import { shallow } from 'enzyme';
import { sandbox } from 'sinon';
import _ from 'lodash';

import TextArea from 'src/shared/components/textArea';

const sinon = sandbox.create();

describe('TextArea', () => {
  let onChangeStub;
  let onMessageChangeStub;

  beforeEach(() => {
    onChangeStub = sinon.stub();
    onMessageChangeStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should have passed in parameters', () => {
      const component = createComponent();

      expect(component).toMatchSnapshot();
    });

    it('should call onChange function when typing', () => {
      const component = createComponent();

      const event = { target: { value: 'sometext' } };

      expect(component.find('textarea').simulate('change', event));
      expect(onChangeStub).to.have.been.calledWith(event);
    });

    it('should call onMessageChange function when typing if passed in', () => {
      const component = createComponent({ onMessageChange: onMessageChangeStub });

      const event = { target: { value: 'sometext' } };

      expect(component.find('textarea').simulate('change', event));
      expect(onChangeStub).to.have.been.calledWith(event);
      expect(onMessageChangeStub).to.have.been.calledWith(event);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      rowCount: 2,
      onChange: onChangeStub,
      maxLength: 100,
      placeholder: 'value',
      className: 'value',
      value: 'value'
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return shallow(<TextArea {...mergedProps} />);
  };
});
