import _ from 'lodash';

const SelectBoundsHelper = {
  hasBothBoundsSelected(selectBounds) {
    return _.isEqual(selectBounds, ['outbound', 'inbound']);
  },
  hasOutboundSelectedOnly(selectBounds) {
    return _.isEqual(selectBounds, ['outbound']);
  },
  hasInboundSelectedOnly(selectBounds) {
    return _.isEqual(selectBounds, ['inbound']);
  }
};

export default SelectBoundsHelper;
