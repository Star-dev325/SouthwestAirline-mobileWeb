import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';

import Button from 'src/shared/components/button';

const sinon = sandbox.create();

describe('Button', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should render correctly', () => {
    expect(mount(<Button />)).toMatchSnapshot();
  });

  it('Button should render with color', () => {
    expect(mount(<Button color="red" />)).toMatchSnapshot();
  });

  it('Button should render with size', () => {
    expect(mount(<Button size="big" />)).toMatchSnapshot();
  });

  it('Button should render with icon', () => {
    expect(mount(<Button icon="cloud" iconLabeled="right" />)).toMatchSnapshot();
  });

  it('Button should render fluid', () => {
    expect(mount(<Button fluid />)).toMatchSnapshot();
  });

  it('Button should render circular', () => {
    expect(mount(<Button circular />)).toMatchSnapshot();
  });

  it('Button should render as link', () => {
    expect(mount(<Button href="www.test.com" target="_blank" />)).toMatchSnapshot();
  });

  it('Clicking the button should stop propagating click event to parent element', () => {
    const onDivClickedSpy = sinon.spy();
    const onButtonClickedSpy = sinon.spy();
    const ButtonWithEvent = mount(
      <div onClick={onDivClickedSpy}>
        <Button onClick={onButtonClickedSpy} />
      </div>
    );

    const buttonWrapper = ButtonWithEvent.find(Button);

    buttonWrapper.simulate('click');

    expect(onButtonClickedSpy).to.have.been.called;
    expect(onDivClickedSpy).not.to.have.been.called;
  });
});
