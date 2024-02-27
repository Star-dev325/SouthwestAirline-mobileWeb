import SelectBoundsHelper from 'src/airChange/helpers/selectBoundsHelper';

describe('SelectBoundsHelper', () => {
  context('hasBothBoundsSelected', () => {
    it('should return true when both bounds selected', () => {
      expect(SelectBoundsHelper.hasBothBoundsSelected(['outbound', 'inbound'])).to.be.true;
    });

    it('should return false if bound order is inbound, outbound', () => {
      expect(SelectBoundsHelper.hasBothBoundsSelected(['inbound', 'outbound'])).to.be.false;
    });
  });

  context('hasOutboundSelectedOnly', () => {
    it('should return true when only outbound selected', () => {
      expect(SelectBoundsHelper.hasOutboundSelectedOnly(['outbound'])).to.be.true;
    });

    it('should return false when only inbound selected', () => {
      expect(SelectBoundsHelper.hasOutboundSelectedOnly(['inbound'])).to.be.false;
    });

    it('should return false when both bounds selected', () => {
      expect(SelectBoundsHelper.hasOutboundSelectedOnly(['outbound', 'inbound'])).to.be.false;
    });
  });

  context('hasInboundSelectedOnly', () => {
    it('should return true when only inbound selected', () => {
      expect(SelectBoundsHelper.hasInboundSelectedOnly(['inbound'])).to.be.true;
    });

    it('should return false when only outbound selected', () => {
      expect(SelectBoundsHelper.hasInboundSelectedOnly(['outbound'])).to.be.false;
    });

    it('should return false when both bounds selected', () => {
      expect(SelectBoundsHelper.hasInboundSelectedOnly(['outbound', 'inbound'])).to.be.false;
    });
  });
});
