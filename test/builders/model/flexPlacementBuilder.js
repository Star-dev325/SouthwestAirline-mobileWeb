export default class flexPlacementBuilder {
  constructor() {
    this.displayType = 'flex-placement';
    this.contentBlockId = null;
    this.placementData = {
      segment: 'TEST_MBOOKING'
    };
    this.viewPortThreshold = 0.5;
    this.shouldObserveViewPort = false;
    this.isChasePrequal = false;
    this.isChaseCombo = false;
    this.isChasePlacement = false;
    this.placement = {
      templateKeys: ['name', 'tierStatus'],
      flexSettings: {
        disableAbsolutePositioning: true,
        shouldScalePlacement: true
      },
      childContent: [
        {
          childContent: [
            {
              textContent: 'Hi, ${name}',
              type: 'em',
              props: {}
            },
            {
              textContent: 'points ',
              type: 'span',
              props: {}
            },
            {
              textContent: ' ${tierStatus}',
              type: 'b',
              props: {}
            }
          ],
          styles: {
            color: '#294299'
          },
          props: {
            id: 'loggedin_user_details_1_flex_text_block_1'
          }
        }
      ],
      styles: {},
      props: {
        id: 'loggedin_user_details_1_flex'
      }
    };
  }

  build() {
    const response = {
      displayType: this.displayType,
      placement: this.placement,
      placementData: this.placementData,
      viewPortThreshold: this.viewPortThreshold,
      shouldObserveViewPort: this.shouldObserveViewPort,
      contentBlockId: this.contentBlockId,
      isChasePrequal: this.isChasePrequal,
      isChaseCombo: this.isChaseCombo,
      isChasePlacement: this.isChasePlacement
    };

    return response;
  }
}
