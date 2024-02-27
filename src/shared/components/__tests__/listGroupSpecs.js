import _ from 'lodash';
import { mount } from 'enzyme';
import React from 'react';
import ListGroup from 'src/shared/components/listGroup';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

describe('list group component', () => {
  it('should display listGroup component without expired message', () => {
    const instance = createComponent({ items: ITEMS });

    expect(instance.find('.item-label.disabled')).not.to.present();
  });

  it('should display listGroup component with expired message if ghost card is expired', () => {
    const instance = createComponent({ items: ITEMS_WITH_DISABLED });

    expect(instance.find('.item-label.disabled')).to.present();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      items: ITEMS,
      group: 'F',
      onItemSelect: sinon.stub()
    };

    return mount(<ListGroup {..._.merge(defaultProps, props)} />);
  };

  const ITEMS_WITH_DISABLED = [
    {
      code: 'First Ghost Card',
      label: 'First Ghost Card',
      disabled: true,
      disabledMessage: ' - EXPIRED'
    }
  ];

  const ITEMS = [
    {
      code: 'First Ghost Card',
      label: 'First Ghost Card',
      disabled: false,
      disabledMessage: ' - EXPIRED'
    }
  ];
});
