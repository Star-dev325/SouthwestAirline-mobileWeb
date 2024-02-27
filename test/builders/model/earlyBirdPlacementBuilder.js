export default class earlyBirdPlacementBuilder {
  constructor() {
    this.displayType = 'flex-placement';
    this.viewPortThreshold = 0.5;
    this.shouldObserveViewPort = false;
    this.isChasePrequal = false;
    this.isChaseCombo = false;
    this.isChasePlacement = false;
    this.contentBlockId = '';
    this.placementData = {
      key: 'value'
    };
    this.placement = {
      childContent: [
        {
          flexSettings: {
            disableAbsolutePositioning: true
          },
          childContent: [
            {
              styles: {
                backgroundColor: '#cccccc',
                top: '0px',
                left: '0px',
                width: '348px',
                position: 'relative',
                height: '1px'
              },
              type: 'div',
              props: {
                role: 'presentation',
                id: 'line_separator_catiou5mghd'
              }
            },
            {
              childContent: [
                {
                  childContent: [
                    {
                      textContent: 'Add EarlyBird Check-In',
                      type: 'span',
                      props: {}
                    },
                    {
                      textContent: '®',
                      type: 'sup',
                      props: {}
                    }
                  ]
                }
              ],
              styles: {
                'padding-top': '22px',
                color: '#6479C5',
                'padding-left': '15px',
                display: 'inline-block',
                width: '70%',
                fontSize: '18px'
              },
              type: 'Heading',
              props: {
                id: 'heading_idvzta6conh'
              }
            },
            {
              childContent: [
                {
                  props: {
                    command: 'EARLY_BIRD_SWITCH'
                  }
                }
              ],
              styles: {
                display: 'inline-block',
                'margin-top': '15px',
                float: 'right',
                'margin-right': '15px'
              },
              type: 'div',
              props: {
                id: 'command_4xn1hmdbw3a'
              }
            },
            {
              childContent: [
                {
                  textContent: '$${earlyBirdTotalPrice} ',
                  styles: {
                    'font-weight': 'bold',
                    'font-size': '15'
                  },
                  type: 'span',
                  props: {}
                },
                {
                  textContent: '(Starting from $${earlyBirdUnitPrice} per passenger, each way)',
                  styles: {
                    'font-size': '11px'
                  },
                  type: 'span',
                  props: {}
                }
              ],
              styles: {
                'padding-top': '0px',
                color: '#8f8f8f',
                'padding-left': '15px',
                fontSize: '12px'
              },
              props: {
                id: 'text_block_iclmmomkfm'
              }
            },
            {
              styles: {
                'padding-top': '6px',
                'padding-left': '6px'
              },
              type: 'div',
              props: {
                id: 'command_s6nsvjp0qr8'
              }
            },
            {
              childContent: [
                {
                  props: {
                    command: 'EARLY_BIRD_PRICING_BREAKDOWN'
                  }
                }
              ]
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            id: 'flex_content_xgzqy1f9jqe'
          },
          type: 'div',
          props: {}
        },
        {
          flexSettings: {
            disableAbsolutePositioning: true
          },
          childContent: [
            {
              styles: {
                backgroundColor: '#cccccc',
                top: '0px',
                left: '0px',
                width: '348px',
                position: 'relative',
                height: '1px'
              },
              type: 'div',
              props: {
                role: 'presentation',
                id: 'line_separator_qt1iou5mghd'
              }
            },
            {
              childContent: [
                {
                  childContent: [
                    {
                      textContent: 'Automatic check-in',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {},
                  type: 'li',
                  props: {
                    id: 'text_list_item_7qikvqalvsb'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: 'Earlier boarding position',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {},
                  type: 'li',
                  props: {
                    id: 'text_list_item_3md8d1xcy3t'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: 'Earlier access to seats',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {},
                  type: 'li',
                  props: {
                    id: 'text_list_item_r4qmppq9is'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: 'Earlier access to overhead bin space',
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {},
                  type: 'li',
                  props: {
                    id: 'text_list_item_58irypp6ins'
                  }
                }
              ],
              styles: {
                'background-color': '#e6e7e8',
                color: '#666666',
                'padding-left': '37px',
                listStyleType: 'disc',
                fontSize: '14px',
                'margin-top': '5px'
              },
              type: 'ul',
              props: {
                id: 'text_list_6h5pd59ab7s'
              }
            }
          ],
          styles: {
            backgroundColor: '#E6E7E8',
            id: 'flex_content_abcqy1f9jqe'
          },
          type: 'div',
          props: {}
        }
      ],
      flexSettings: { disableAbsolutePositioning: true },
      props: { id: 'flex_9ku4tpyu9dj' },
      styles: { backgroundColor: 'none' },
      templateKeys: ['earlyBirdTotalPrice', 'earlyBirdUnitPrice']
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
      contentBlockId: this.contentBlockId,
      placementData: this.placementData
    };
  }
}
