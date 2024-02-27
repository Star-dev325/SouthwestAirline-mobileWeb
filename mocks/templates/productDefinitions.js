module.exports = {
  products: [
    {
      productId: 'WGA',
      id: 'WGA',
      label: 'Wanna Get Away',
      inverseThemeColor: 'neutral-black',
      primaryThemeColor: 'primary-yellow',
      rowOrder: 1,
      features: [
        {
          icon: 'circle',
          label: '2 Free Checked Bags®*'
        },
        {
          icon: 'circle',
          label: 'No Change Fees**'
        },
        {
          icon: 'circle',
          label: 'Reusable funds (up to 12 months from date of purchase)'
        }
      ]
    },
    {
      productId: 'PLU',
      id: 'PLU',
      label: 'Wanna Get Away Plus',
      stylizedLabel: [
        {
          label: 'Wanna Get Away',
          primaryLabelColor: 'primary-dark-blue',
          inverseLabelColor: 'neutral-white'
        },
        {
          label: ' plus',
          font: 'Fairwater Script',
          primaryLabelColor: 'primary-red',
          inverseLabelColor: 'neutral-white'
        }
      ],
      inverseThemeColor: 'neutral-white',
      primaryThemeColor: 'primary-red',
      rowOrder: 2,
      features: [
        {
          icon: 'circle',
          label: 'All the benefits of Wanna Get Away, plus:'
        },
        {
          icon: 'plus',
          label: 'Same-day change',
          suffix: '3'
        },
        {
          icon: 'plus',
          label: 'Same-day standby',
          suffix: '3'
        },
        {
          icon: 'plus',
          label: 'Transferable Funds',
          suffix: '4'
        }
      ]
    },
    {
      productId: 'ANY',
      id: 'ANY',
      label: 'Anytime',
      inverseThemeColor: 'neutral-black',
      primaryThemeColor: 'primary-lightened-blue',
      rowOrder: 2,
      features: [
        {
          icon: 'circle',
          label: 'All the benefits of Wanna Get Away, plus:'
        },
        {
          icon: 'plus',
          label: 'Refundable',
          suffix: '2'
        },
        {
          icon: 'plus',
          label: 'Same-day change',
          suffix: '3'
        },
        {
          icon: 'plus',
          label: 'Same-day standby',
          suffix: '3'
        }
      ]
    },
    {
      productId: 'BUS',
      id: 'BUS',
      label: 'Business Select',
      inverseThemeColor: 'neutral-black',
      primaryThemeColor: 'primary-blue',
      rowOrder: 3,
      features: [
        {
          icon: 'circle',
          label: 'All the benefits of Anytime, plus:'
        },
        {
          icon: 'plus',
          label: 'Priority Boarding A1-A15'
        },
        {
          icon: 'plus',
          label: 'Fly By® Security Lane',
          suffix: '4'
        },
        {
          icon: 'plus',
          label: 'Fly By® Priority Lane',
          suffix: '4'
        },
        {
          icon: 'plus',
          label: 'Premium drink',
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
    {
      icon: 'DollarCircle',
      label: 'No Change Fees',
      suffix: '**'
    }
  ],
  disclaimers: [
    {
      label:
        '<a href=\\"/baggage-restrictions" target=\\"_blank\\">* First and second checked bags. Weight and size limits apply.</a>'
    },
    {
      prefix: '**',
      label: 'Fare difference may apply.'
    }
  ]
};
