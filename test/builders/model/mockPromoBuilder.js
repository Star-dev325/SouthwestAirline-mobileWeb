export default class MockPromoBuilder {
  constructor() {
    this.promoPlacements = {};
  }

  withPromoTextContent(textContent) {
    if (textContent === 'promoBottom02') {
      this.promoPlacements = {
        displayType: 'flex-placement',
        placement: {
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
                    width: '46px',
                    height: '46px'
                  },
                  type: 'img',
                  props: {
                    src: '/content/mkt/images/icons/car_circle.png',
                    alt: 'car',
                    width: '46px',
                    id: 'airBookingConfirmation_promoBottom02_car_flex_graphic_1',
                    height: '46px'
                  }
                }
              ],
              styles: {
                margin: '15px 20px 0px 0px',
                display: 'inline-flex',
                float: 'right'
              },
              type: 'div',
              props: {
                id: 'airBookingConfirmation_promoBottom02_car_flex_content_1'
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
                      textContent: 'Need a',
                      type: 'span',
                      props: {}
                    },
                    {
                      textContent: '',
                      type: 'br',
                      props: {}
                    },
                    {
                      textContent: 'rental car?',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {
                    'margin-left': '20px',
                    margin: '10px 0px 15px 20px',
                    color: '#ffffff',
                    'font-weight': 'bold',
                    'font-size': '32px',
                    'margin-top': '10px',
                    'margin-bottom': '20px'
                  },
                  props: {
                    id: 'airBookingConfirmation_promoBottom02_car_flex_text_block_1'
                  }
                }
              ],
              styles: {
                display: 'inline-flex'
              },
              type: 'div',
              props: {
                id: 'airBookingConfirmation_promoBottom02_car_flex_content_2'
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
                      textContent: 'Book it now',
                      type: 'span'
                    }
                  ],
                  styles: {
                    'background-color': '#ffca4f',
                    border: '1px solid #111b40',
                    'border-radius': '3px',
                    'box-shadow': 'inset 0 -1px 1px 0 #ffaa7b',
                    padding: '10px 65px 10px',
                    color: '#111b40',
                    'font-weight': '700',
                    display: 'inline-block',
                    width: '340px',
                    'font-size': '16px'
                  },
                  type: 'span',
                  props: {
                    id: 'airBookingConfirmation_promoBottom02_car_flex_command_1',
                    'aria-label': 'car booking',
                    command: 'CROSS_SELL_CAR_LINK'
                  }
                }
              ],
              styles: {
                'text-align': 'center'
              },
              type: 'div',
              props: {
                id: 'airBookingConfirmation_promoBottom02_car_flex_content_3'
              }
            }
          ],
          styles: {
            'background-color': '#111b40',
            width: '355px',
            height: '150px'
          },
          props: {
            id: 'airBookingConfirmation_promoBottom02_car_flex'
          }
        },
        placementData: {
          linkType: 'browser'
        },
        viewPortThreshold: 0.5,
        shouldObserveViewPort: false,
        contentBlockId: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false
      };      
    } else {
      this.promoPlacements = {
        displayType: 'flex-placement',
        placement: {
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
                    top: '5px',
                    left: '5px',
                    width: '135px',
                    position: 'absolute',
                    height: '115px'
                  },
                  type: 'img',
                  props: {
                    src: '/content/mkt/images/airport_info/DAL2_airport_info.jpg',
                    alt: 'hotel',
                    id: 'graphic_antseeh7ra'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: textContent,
                      type: 'span',
                      translate: 'false',
                      props: {}
                    },
                    {
                      textContent: '',
                      type: 'br',
                      translate: 'false',
                      props: {}
                    },
                    {
                      textContent: 'Dummy Placement',
                      styles: {
                        color: '#ADD8E6',
                        'font-weight': 'normal',
                        'font-size': '16px'
                      },
                      type: 'span',
                      translate: 'false',
                      props: {}
                    }
                  ],
                  styles: {
                    color: '#ffffff',
                    top: '20px',
                    left: '155px',
                    fontSize: '24px',
                    position: 'absolute',
                    'text-align': 'left'
                  },
                  type: 'strong',
                  props: {
                    id: 'text_block_20hfnodiwhr'
                  }
                }
              ],
              styles: {
                backgroundColor: '#304cb2',
                width: '355px',
                position: 'relative',
                height: '125px'
              },
              type: 'div',
              props: {
                id: 'flex_content_dm7fu6x7wtm'
              }
            }
          ],
          styles: {
            backgroundColor: 'none',
            margin: '0px 0px 6px 0px',
            width: '355px',
            height: '125px'
          },
          props: {
            id: 'flex_ok0lx1kh6ue'
          }
        },
        placementData: {
          linkType: 'browser'
        },
        viewPortThreshold: 0.5,
        shouldObserveViewPort: false,
        contentBlockId: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false
      };
    }

    return this;
  }
  
  build() {
    return this.promoPlacements;
  }
}
  
module.exports = MockPromoBuilder;
