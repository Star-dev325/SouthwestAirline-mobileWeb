export default {
  success: true,
  errors: [],
  results: {
    placementKey: {
      modDate: 1622664246103,
      index: 'content-service-placements-idx-qa1a-v20210526',
      contentBlockId: null,
      id: 'kp8pffvh',
      crDate: 1622664246103,
      type: 'flex-placement',
      lang: 'en',
      pubDate: 1620851760000,
      expDate: null,
      content: {
        displayType: 'flex-placement',
        placement: {
          templateKeys: ['companionRemainingPoints'],
          flexSettings: {
            disableAbsolutePositioning: true,
            shouldScalePlacement: true
          },
          childContent: [
            {
              flexSettings: {
                disableAbsolutePositioning: true
              },
              childContent: [
                {
                  styles: {
                    top: '160px',
                    left: '35px',
                    width: '185px',
                    position: 'absolute',
                    height: '118px'
                  },
                  type: 'img',
                  props: {
                    src: '/content/mkt/images/landing_pages/__tests__/2019-rr-chase-plus-card-xs.png',
                    alt: 'test',
                    id: 'graphic_b47w5lbvhmb'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: "You're ${companionRemainingPoints} points away from Companion Pass!",
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {
                    'word-wrap': 'normal',
                    color: '#ffbf27',
                    top: '35px',
                    left: '35px',
                    lineHeight: '52px',
                    fontSize: '36px',
                    position: 'absolute',
                    'text-align': 'left'
                  },
                  type: 'strong',
                  props: {
                    id: 'text_block_tj4139dyg7'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: 'Your 65,000 point offer is waiting for a limited time.',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {
                    color: '#f5f5f5',
                    top: '175px',
                    left: '240px',
                    'font-weight': 'bold',
                    fontSize: '27px',
                    position: 'absolute',
                    'text-align': 'left'
                  },
                  props: {
                    id: 'text_block_3y64psr7wta'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: 'Learn More',
                      styles: {
                        color: '#a4baf2',
                        top: '285px',
                        'font-weight': 'bold',
                        fontSize: '21px',
                        position: 'absolute',
                        right: '35px',
                        'text-align': 'left'
                      },
                      type: 'span',
                      props: {}
                    }
                  ],
                  props: {
                    id: 'text_block_n4claveenm'
                  }
                }
              ],
              styles: {
                backgroundColor: '#304cb2',
                width: '598px',
                id: 'flex_content_npzpfe7rtka',
                position: 'relative',
                height: '330px'
              },
              type: 'div',
              props: {}
            }
          ],
          styles: {
            backgroundColor: '#1a2c80',
            fontFamily: 'Southwest Sans, Arial, sans-serif',
            display: 'block',
            width: '598px',
            height: '330px'
          },
          type: 'a',
          props: {
            display: 'block',
            id: 'flex_ci0fk0nohas',
            href: 'https://chase-tools.dev1.southwest.com?REF=MWEB',
            command: 'PLACEMENT_LINK'
          }
        },
        placementData: {
          isChasePlacement: true,
          segment: 'companionPass',
          linkType: 'webview'
        }
      },
      revision: 0
    }
  }
};
