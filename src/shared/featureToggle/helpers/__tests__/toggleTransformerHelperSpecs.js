import { transformToToggles } from 'src/shared/featureToggle/helpers/toggleTransformerHelper';

describe('toggleTransformerHelper', () => {
  let bootstrapApplicationToggles;
  let wcmFeatureToggles;

  beforeEach(() => {
    bootstrapApplicationToggles = {
      enable: ['IsExclusivePromotionsHidden']
    };
    wcmFeatureToggles = {
      results: {
        applicationToggles: {
          enable: ['IsExclusivePromotionsHidden']
        }
      }
    };
  });

  describe('transformToToggles', () => {
    it('should return default toggle values with wcm toggles set to true', () => {
      const response = transformToToggles(wcmFeatureToggles, 'results.applicationToggles.enable');

      expect(response).to.have.property('IsExclusivePromotionsHidden', true);
    });

    it('should return default toggle values with bootstrap toggles set to true', () => {
      const response = transformToToggles(bootstrapApplicationToggles, 'enable');

      expect(response).to.have.property('IsExclusivePromotionsHidden', true);
    });
  });
});
