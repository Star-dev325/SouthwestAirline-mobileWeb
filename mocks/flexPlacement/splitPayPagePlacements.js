export const paymentBanner = {
  displayType: 'flex-placement',
  placement: {
    templateKeys: ['redeemablePoints'],
    flexSettings: {
      disableAbsolutePositioning: true,
      shouldScalePlacement: true
    },
    childContent: [
      {
        flexSettings: {
          disableAbsolutePositioning: true,
          shouldScalePlacement: true
        },
        childContent: [
          {
            styles: {
              height: '80px',
              marginLeft: '25px',
              marginTo: '15px',
              width: '85px'
            },
            type: 'img',
            props: {
              alt: 'cash and points',
              height: '80px',
              id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex_graphic_1',
              src: '/content/mkt/images/icons/retail-icon.png',
              width: '85px'
            }
          },
          {
            childContent: [
              {
                textContent: 'Save up to 20% when you use your points on this purchase.',
                type: 'span',
                props: {}
              }
            ],
            styles: {
              color: '#111b40',
              fontSize: '150%',
              fontWeight: 'bold',
              paddingLeft: '20px',
              paddingTop: '3px'
            },
            props: {
              id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex_text_block_2'
            }
          }
        ],
        styles: {
          display: 'inline-flex',
          marginLeft: '35px',
          marginRight: '35px',
          marginTop: '20px'
        },
        type: 'div',
        props: {
          id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex_content_1'
        }
      },
      {
        flexSettings: {
          disableAbsolutePositioning: true,
          shouldScalePlacement: true
        },
        childContent: [
          {
            childContent: [
              {
                textContent: 'As a Rapid Rewards Member, use some of your',
                type: 'span',
                props: {}
              },
              {
                textContent: ' ',
                type: 'span',
                props: {}
              },
              {
                textContent: '100,000 points',
                styles: {
                  color: '#008020',
                  fontWeight: '700'
                },
                type: 'span',
                props: {}
              },
              {
                textContent: ' on this trip.',
                type: 'span',
                props: {}
              }
            ],
            styles: {
              color: '#636363',
              fontSize: '105%',
              marginLeft: '25px',
              marginTop: '20px',
              paddingBottom: '15px'
            },
            props: {
              id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex_text_block_1'
            }
          }
        ],
        styles: {
          marginBottom: '5px',
          paddingRight: '10px',
          paddingTop: '15px'
        },
        type: 'div',
        props: {
          id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex_content_2'
        }
      }
    ],
    styles: {
      backgroundColor: '#ffffff',
      width: '750px'
    },
    props: {
      id: 'cashPointsIndex_paymentBanner_aud_acq_mweb_flex'
    }
  }
};
