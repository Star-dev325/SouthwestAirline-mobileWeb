import {
  calculateDateDiffs,
  calculateOverrideDateDiffs
} from 'src/shared/analytics/helpers/analyticsCalendarStripHelper';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';

describe('analyticsCalendarStripHelper', () => {
  context('calculateDateDiffs', () => {
    it('should calculate inbound date difference', () => {
      const diffs = calculateDateDiffs('1997-08-29', '1997-08-04', INBOUND, {});

      expect(diffs).to.deep.equal({
        inbound: '+25'
      });
    });

    it('should calculate outbound date difference', () => {
      const diffs = calculateDateDiffs('1997-08-29', '1997-08-30', OUTBOUND, {});

      expect(diffs).to.deep.equal({
        outbound: '-1'
      });
    });

    it('should add to existing dates', () => {
      const diffs = calculateDateDiffs('1997-08-29', '1997-08-30', OUTBOUND, {
        inbound: '+1'
      });

      expect(diffs).to.deep.equal({
        inbound: '+1',
        outbound: '-1'
      });
    });

    it('should provide default empty current diffs when not provided', () => {
      const diffs = calculateDateDiffs('1997-08-29', '1997-08-28', OUTBOUND);

      expect(diffs).to.deep.equal({
        outbound: '+1'
      });
    });
  });

  context('calculateOverrideDateDiffs', () => {
    it('should adjust inbound date when outbound and the end date had a forced update', () => {
      const diffs = calculateOverrideDateDiffs('1997-08-29', '1997-08-30', OUTBOUND, true, {});

      expect(diffs).to.deep.equal({
        inbound: '-1'
      });
    });

    it('should override existing dates when outbound and  the end date had a forced update', () => {
      const diffs = calculateOverrideDateDiffs('1997-08-29', '1997-08-30', OUTBOUND, true, {
        inbound: '-2'
      });

      expect(diffs).to.deep.equal({
        inbound: '-1'
      });
    });

    it('should return empty object when outbound and no forced update regardless of previous history', () => {
      const diffs = calculateOverrideDateDiffs('1997-08-29', '1997-08-30', OUTBOUND, false, {
        inbound: '-2'
      });

      expect(diffs).to.deep.equal({});
    });

    it('should return empty diffs when when inbound and no forced update', () => {
      const diffs = calculateOverrideDateDiffs('1997-08-29', '1997-08-30', INBOUND, false, {
        outbound: '-2'
      });

      expect(diffs).to.deep.equal({});
    });

    it('should provide default empty current diffs when not provided', () => {
      const diffs = calculateOverrideDateDiffs('1997-08-29', '1997-08-28', OUTBOUND, false);

      expect(diffs).to.deep.equal({});
    });
  });
});
