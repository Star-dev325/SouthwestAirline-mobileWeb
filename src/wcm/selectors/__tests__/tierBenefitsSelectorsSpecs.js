import { getTierBenefits } from 'src/wcm/selectors/tierBenefitsSelectors';

describe('tier benefits selectors', () => {
  it('should transform to correct format', () => {
    const response = {
      tier_benefits: {
        heading: 'I AM THE TITLE',
        descriptions: [
          {
            title: 'A-List',
            color: '#294299',
            attributes: [
              {
                attribute: 'Earning Bonus',
                value: '25%'
              },
              {
                attribute: 'Priority Boarding',
                attribute_suffix: '(Priority Security Line)',
                value: true
              }
            ]
          },
          {
            title: 'A-List Preferred',
            color: '#111b40',
            attributes: [
              {
                attribute: 'Earning Bonus',
                value: '100%'
              },
              {
                attribute: 'Priority Boarding',
                attribute_suffix: '(Priority Security Line)',
                value: true
              }
            ]
          }
        ]
      }
    };

    expect(getTierBenefits.resultFunc(response)).to.deep.equal({
      title: 'I AM THE TITLE',
      headings: [
        {
          title: 'A-List',
          color: '#294299'
        },
        {
          title: 'A-List Preferred',
          color: '#111b40'
        }
      ],
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
      }
    });
  });
});
