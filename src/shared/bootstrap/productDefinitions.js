import _ from 'lodash';

const bootstrapProductDefinitions = {
  products: [
    {
      productId: 'WGA',
      label: 'Wanna Get Away',
      primaryThemeColor: 'primary-yellow',
      inverseThemeColor: 'neutral-black',
      rowOrder: 1,
      features: [
        { icon: 'circle', label: '2 Free Checked Bags®', suffix: '*' },
        {
          icon: 'circle',
          label: 'No Change Fees',
          suffix: '**'
        },
        { icon: 'circle', label: 'Flight credit (up to 12 months from date of purchase)' }
      ]
    },
    {
      productId: 'ANY',
      label: 'Anytime',
      primaryThemeColor: 'primary-lightened-blue',
      inverseThemeColor: 'neutral-black',
      rowOrder: 2,
      features: [
        { icon: 'circle', label: 'All the benefits of Wanna Get Away, plus:' },
        {
          icon: 'plus',
          label: 'Refundable',
          suffix: '2'
        },
        { icon: 'plus', label: 'Same-day change', suffix: '3' },
        {
          icon: 'plus',
          label: 'Same-day standby',
          suffix: '3'
        }
      ]
    },
    {
      productId: 'BUS',
      label: 'Business Select',
      primaryThemeColor: 'primary-blue',
      inverseThemeColor: 'neutral-white',
      rowOrder: 3,
      features: [
        { icon: 'circle', label: 'All the benefits of Anytime, plus:' },
        {
          icon: 'plus',
          label: 'Priority Boarding A1-A15'
        },
        { icon: 'plus', label: 'Fly By® Security Lane', suffix: '4' },
        {
          icon: 'plus',
          label: 'Fly By® Priority Lane',
          suffix: '4'
        }
      ]
    }
  ],
  highlightedFeatures: [
    {
      icon: 'Suitcase',
      label: 'First 2 Bags Fly Free',
      suffix: '®*'
    },
    { icon: 'DollarCircle', label: 'No Change Fees', suffix: '**' }
  ],
  disclaimers: [
    {
      label:
        '<a href="https://mobile.southwest.com/baggage-restrictions" target="_blank">* Weight and size limits apply.</a>'
    },
    { label: '** Fare difference may apply.' }
  ],
  _links: null
};

export const getProductDefinitions = (state) => {
  const productDefinitions = _.get(state, 'app.productDefinitions', bootstrapProductDefinitions);

  return !_.isEmpty(productDefinitions) ? productDefinitions : bootstrapProductDefinitions;
};
