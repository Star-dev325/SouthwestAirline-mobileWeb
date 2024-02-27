import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import RichNavItem from 'src/shared/components/richNavItem';

describe('richNavItem', () => {
  let onClickStub;

  beforeEach(() => {
    onClickStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialized properly', () => {
    const { container } = component();

    expect(container.querySelector('.rich-nav-item')).not.toBeNull();
  });

  it('should render image properly if no imageRender passed in', () => {
    const { container } = component();

    expect(container.querySelector('img')).not.toBeNull();
  });

  it('should trigger onClick callback when user click the item', () => {
    const { container } = component();

    fireEvent.click(container.querySelector('a'));

    expect(onClickStub).toBeCalledWith({ link_type: 'app', target: 'airports' });
  });

  const component = (props) => {
    const defaultProps = {
      alt: 'test',
      description: 'test',
      image: '',
      link_type: 'app',
      onClick: onClickStub,
      target: 'airports',
      title: 'test'
    };

    const componentProps = _.merge({}, defaultProps, props);

    return render(<RichNavItem {...componentProps} />);
  };
});
