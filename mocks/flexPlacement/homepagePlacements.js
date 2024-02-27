export const loginBanner = {
  displayType: 'flex-placement',
  placement: {
    flexSettings: {
      disableAbsolutePositioning: true,
      shouldScalePlacement: true
    },
    childContent: [
      {
        styles: {
          top: '20px',
          left: '20px',
          width: '39px',
          position: 'absolute',
          height: '40px'
        },
        type: 'img',
        props: {
          src: '/content/mkt/images/icons/icon_profile.png',
          alt: 'Profile',
          width: '39px',
          id: 'encourageLogin_flex_graphic_1',
          height: '40px'
        }
      },
      {
        childContent: [
          {
            textContent: 'HAVE AN ACCOUNT? LOG IN',
            type: 'span',
            props: {}
          }
        ],
        styles: {
          color: '#304cb2',
          top: '18px',
          left: '80px',
          'font-weight': 'bold',
          'font-size': '32px',
          'font-family': 'Southwest Sans, Arial, sans-serif',
          position: 'absolute'
        },
        props: {
          id: 'encourageLogin_flex_text_block_2'
        }
      },
      {
        childContent: [
          {
            textContent: 'Earn points when you book and your trip stays in your account for easy access.',
            type: 'span',
            props: {}
          }
        ],
        styles: {
          color: '#000000',
          top: '55px',
          left: '80px',
          'font-size': '32px',
          'font-family': 'Southwest Sans, Arial, sans-serif',
          position: 'absolute'
        },
        props: {
          id: 'encourageLogin_flex_text_block_3'
        }
      },
      {
        childContent: [
          {
            textContent: '',
            type: 'span',
            props: {}
          },
          {
            textContent: '',
            type: 'div',
            props: {
              command: 'CLOSE_BUTTON'
            }
          }
        ],
        styles: {
          top: '10px',
          position: 'absolute',
          right: '20px'
        },
        props: {
          id: 'encourageLogin_flex_text_block_4'
        }
      }
    ],
    styles: {
      'background-color': '#ffffff',
      'background-size': 'cover',
      'text-decoration': 'none',
      display: 'block',
      width: '750px',
      'font-family': 'Southwest Sans, Arial, sans-serif',
      height: '150px'
    },
    props: {
      id: 'encourageLogin_flex'
    }
  }
};
