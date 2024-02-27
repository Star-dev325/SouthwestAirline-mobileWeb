import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import ImgThatHidesOnError from 'src/shared/components/imgThatHidesOnError';

describe('ImgThatHidesOnError', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render img tag', () => {
    const { container } = createComponent({ src: 'something' });

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('should not try to render until it has a src', () => {
    const { container } = createComponent({});

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('should render null if there is an error', () => {
    const instance = React.createRef();
    const { container } = createComponent({ src: 'something', ref: instance });

    instance.current._onImageError();

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});

const createComponent = (props) => render(<ImgThatHidesOnError {...props} />);
