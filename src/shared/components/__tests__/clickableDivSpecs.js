import React from 'react';
import _ from 'lodash';
import { sandbox } from 'sinon';
import { shallow } from 'enzyme';
import Icon from 'src/shared/components/icon';
import ClickableDiv from 'src/shared/components/clickableDiv';

const sinon = sandbox.create();

describe('Clickable div component', () => {
  let onClickStub;
  let clickableDivWrapper;

  beforeEach(() => {
    onClickStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call onClick callback function when user click div', () => {
    clickableDivWrapper = createComponent();

    clickableDivWrapper.simulate('click');

    expect(onClickStub).to.have.been.called;
  });

  it('should render icon with icon type props', () => {
    clickableDivWrapper = createComponent({ iconType: 'calender' });

    const icon = clickableDivWrapper.find(Icon);

    expect(icon).to.have.prop('type').equal('calender');
  });

  it('should render child component into this component', () => {
    clickableDivWrapper = createComponent(
      { iconType: 'calender', childClassName: 'ellipsis py3 bold', dataQa: 'clickable-div-child' },
      <div>This is child.</div>
    );

    const childDiv = clickableDivWrapper.find('[data-qa="clickable-div-child"]');

    expect(childDiv).to.have.text('This is child.');
    expect(childDiv).to.have.className('ellipsis');
    expect(childDiv).to.have.className('py3');
    expect(childDiv).to.have.className('bold');
  });

  const createComponent = (props, child) => {
    const defaultProps = {
      onClick: onClickStub,
      iconType: 'car'
    };
    const componentProps = _.merge({}, defaultProps, props);

    return shallow(<ClickableDiv {...componentProps}>{child}</ClickableDiv>);
  };
});
