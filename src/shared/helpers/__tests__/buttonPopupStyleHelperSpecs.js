import { buttonPopupStyleTypeClass } from 'src/shared/helpers/buttonPopupStyleHelper';

import { DEFAULT, DESTRUCTIVE, PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

describe('ButtonPopupStyleHelper', () => {
  context('buttonPopupStyleTypeClass', () => {
    it('should return default class if style is empty', () => {
      const result = buttonPopupStyleTypeClass();

      expect(result).to.equal(`button-popup_${DEFAULT}`);
    });

    it('should return default class if style is default', () => {
      const result = buttonPopupStyleTypeClass(DEFAULT);

      expect(result).to.equal(`button-popup_${DEFAULT}`);
    });

    it('should return primary class if style is primary', () => {
      const result = buttonPopupStyleTypeClass(PRIMARY);

      expect(result).to.equal(`button-popup_${PRIMARY}`);
    });

    it('should return destructive class if style is destructive', () => {
      const result = buttonPopupStyleTypeClass(DESTRUCTIVE);

      expect(result).to.equal(`button-popup_${DESTRUCTIVE}`);
    });
  });
});
