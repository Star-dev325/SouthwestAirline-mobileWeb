import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Accordion from 'src/homeAndNav/components/accordion';
import { fireEvent, render } from '@testing-library/react';

describe('Accordion', () => {
  describe('#render', () => {
    it('should render heading, body, and icon', () => {
      const headingDom = <div className="header">heading content</div>;
      const bodyDom = <div className="body">body content</div>;

      const props = { headingDom, bodyDom, open: false };

      const { container } = createComponent(props);

      expect(container.querySelector('.accordion--heading').textContent).toEqual('heading content');
      expect(container.querySelector('.accordion--body').textContent).toEqual('body content');
      expect(container.querySelector('.icon_closeddrawer')).not.toBeNull();
    });
  });

  describe('#handleHeaderClick', () => {
    let bodyDom;
    let headingDom;
    let props;

    beforeEach(() => {
      headingDom = <div className="header">heading content</div>;

      bodyDom = <div className="body">body content</div>;

      props = { headingDom, bodyDom, open: true };
    });

    it('should hide accordion body when clicked accordion header', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(container.querySelector('.icon_closeddrawer')).not.toBeNull();
    });

    it('should not show accordion body when clicked accordion header twice', () => {
      const instance = React.createRef();

      const { container } = createComponent({ heading: headingDom, body: bodyDom, open: true, ref: instance });

      instance.current.setState({ open: true });

      fireEvent.click(container.querySelector('.accordion--heading'));

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(container.querySelector('.accordion--body')).toHaveStyle('height:auto');
    });

    it('should set height style to auto when accordion body is opened/expanded', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(container.querySelector('.icon_closeddrawer')).not.toBeNull();

      expect(container.querySelector('.accordion--body')).toHaveStyle('height:0px');
    });
  });

  const createComponent = (props) => {
    const noop = () => {};

    const defaultProps = {
      heading: props.headingDom,
      body: props.bodyDom,
      icon: true,
      open: false,
      className: 'accordion',
      onHeaderClick: noop
    };

    const finalProps = { ...defaultProps, ...props };

    return render(<Accordion {...finalProps} />);
  };
});
