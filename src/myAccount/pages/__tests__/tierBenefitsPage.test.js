import { TierBenefitsPage } from 'src/myAccount/pages/tierBenefitsPage';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';

describe('TierBenefitsPage', () => {
  const tierBenefitsContent = {
    categories: {
      'Earning Bonus-0-': [
        {
          title: 'Earning Bonus-0-',
          value: '25%'
        },
        {
          title: 'Earning Bonus-0-',
          value: '100%'
        }
      ],
      'Priority Boarding-1-(Priority Security Line)': [
        {
          title: 'Priority Boarding-1-(Priority Security Line)',
          value: true
        },
        {
          title: 'Priority Boarding-1-(Priority Security Line)',
          value: true
        }
      ]
    },
    headings: [
      {
        color: '#294299',
        title: 'A-List'
      },
      {
        color: '#111b40',
        title: 'A-List Preferred'
      }
    ],
    title: 'I AM THE TITLE'
  };

  describe('when wcm call is successful', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render the title of the page from the wcm content', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="tier-benefits-title"]').textContent).toContain('I AM THE TITLE');
    });

    it('should render the the headings of the page from the wcm content', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="tier-benefits-headings"]').textContent).toContain('A-List');
      expect(container.querySelector('[data-qa="tier-benefits-headings"]').textContent).toContain('A-List Preferred');
    });

    it('should display the categories form the wcm content', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = () =>
    mountWithMemoryRouterAndState(TierBenefitsPage, {}, '/', {
      goBack: () => {},
      push: () => {},
      retrieveTierBenefitsFn: jest.fn(),
      tierBenefitsContent
    });
});
