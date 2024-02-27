export default class chaseRecentFlightsPlacementBuilder {
  constructor() {
    this.displayType = 'flex-placement';
    this.viewPortThreshold = 0.5;
    this.shouldObserveViewPort = false;
    this.isChasePrequal = false;
    this.isChaseCombo = false;
    this.isChasePlacement = true;
    this.contentBlockId = '';
    this.placement = {
      templateKeys: ['destinationAirport'],
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
                top: '20px',
                left: '19px',
                width: '90px',
                position: 'absolute',
                height: '57px'
              },
              type: 'img',
              props: {
                src: '/content/mkt/images/landing_pages/__tests__/2019-rr-chase-plus-card-xs.png',
                alt: 'Chase Card',
                id: 'graphic_b47w5lbvhmb'
              }
            },
            {
              childContent: [
                {
                  textContent: 'Wanna getaway to ${destinationAirport}?',
                  type: 'span',
                  props: {}
                }
              ],
              styles: {
                color: '#f5f5f5',
                top: '16px',
                left: '123px',
                fontSize: '22px',
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
                  textContent: 'Get there faster with 65,000 points',
                  type: 'span',
                  props: {}
                }
              ],
              styles: {
                color: '#f5f5f5',
                top: '68px',
                left: '126px',
                fontSize: '18px',
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
                    top: '105px',
                    'font-weight': 'bold',
                    fontSize: '14px',
                    position: 'absolute',
                    right: '35px',
                    'text-align': 'left'
                  },
                  type: 'span',
                  props: {}
                }
              ],
              styles: {},
              props: {
                id: 'text_block_n4claveenm'
              }
            }
          ],
          styles: {
            backgroundColor: '#304cb2',
            width: '515px',
            id: 'flex_content_npzpfe7rtka',
            position: 'relative',
            height: '142px'
          },
          type: 'div',
          props: {}
        }
      ],
      styles: {
        backgroundColor: '#1a2c80',
        fontFamily: 'Southwest Sans, Arial, sans-serif',
        display: 'block',
        width: '515px',
        height: '142px'
      },
      type: 'a',
      props: {
        display: 'block',
        id: 'flex_ci0fk0nohas',
        href: 'https://sdcdclchmscm001:4700?REF=MWEB',
        command: 'PLACEMENT_LINK'
      }
    };
    this.placementData = {
      isChasePlacement: true,
      segment: 'recentFlights',
      linkType: 'webview'
    };
  }

  build() {
    return {
      displayType: this.displayType,
      isChaseCombo: this.isChaseCombo,
      isChasePlacement: this.isChasePlacement,
      isChasePrequal: this.isChasePrequal,
      shouldObserveViewPort: this.shouldObserveViewPort,
      viewPortThreshold: this.viewPortThreshold,
      placement: this.placement,
      placementData: this.placementData,
      contentBlockId: this.contentBlockId
    };
  }
}
