// @flow
import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import cx from 'classnames';
import Button from 'src/shared/components/button';
import Currency from 'src/shared/components/currency';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';
import PlacementLink from 'src/wcm/components/placementLink';
import { IMAGE, MATH, CHASE_BANNER_CONTENT_STYLES } from 'src/chase/constants/chaseConstants';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { ChaseInstantCreditProps } from 'src/wcm/flow-typed/wcm.types';

const {
  BACKGROUND_COLOR,
  PRIMARY_TEXT_COLOR,
  PRIMARY_TEXT_STYLE,
  SECONDARY_TEXT_COLOR,
  SECONDARY_TEXT_STYLE,
  TOP_MESSAGE_TEXT_COLOR,
  TOP_MESSAGE_TEXT_STYLE,
  TOP_MESSAGE_BACKGROUND_COLOR,
  MATH_LINE_1_COLOR_LEFT,
  MATH_LINE_1_STYLE_LEFT,
  MATH_LINE_2_COLOR_LEFT,
  MATH_LINE_2_STYLE_LEFT,
  MATH_LINE_3_COLOR_LEFT,
  MATH_LINE_3_STYLE_LEFT,
  MATH_LINE_1_COLOR_RIGHT,
  MATH_LINE_1_STYLE_RIGHT,
  MATH_LINE_2_COLOR_RIGHT,
  MATH_LINE_2_STYLE_RIGHT,
  MATH_LINE_3_COLOR_RIGHT,
  MATH_LINE_3_STYLE_RIGHT,
  BUTTON_TYPE,
  AD_TYPE,
  BACKGROUND_IMAGE,
  BACKGROUND_IMAGE_ALT_TEXT
} = CHASE_BANNER_CONTENT_STYLES;

let adType: string;

export default class ChaseInstantCredit extends React.Component<ChaseInstantCreditProps> {
  _transformBannerStyles = (color: string, style: string, background: ?string) => {
    const { styles } = this.props;
    const transformedStyle = _.get(styles, style, '').replace(/,|-/, ' ');

    return `${_.get(styles, color)} ${transformedStyle} ${background ? _.get(styles, background) : ''}`;
  };

  _getAdjustFare = (totalFare: CurrencyType, statementCredit: number) => {
    const adjustedAmount = numeral(totalFare.amount).value() - statementCredit;

    return {
      adjustFareNegative: adjustedAmount < 0,
      adjustedFare: {
        amount: numeral(Math.abs(adjustedAmount)).format('0,0.00'),
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
  };

  render() {
    const {
      totalFare,
      statementCredit,
      partnerImage,
      buttonText,
      topMessageTextValue,
      primaryTextValue,
      secondaryTextValue,
      mathLine1TextValueLeft,
      mathLine2TextValueLeft,
      mathLine3TextValueLeft,
      styles,
      target,
      linkType,
      onClick = _.noop,
      isChaseCombo,
      isChasePlacement,
      referrer = '',
      handlePlacementLinkFn,
      contentBlockId,
      shouldRaiseSatelliteEvent,
      pageId = ''
    } = this.props;
    const fare = this._getAdjustFare(totalFare, statementCredit);

    adType = _.get(styles, AD_TYPE);

    return (
      <div
        data-qa="chase"
        id="chase-container"
        className={cx('p4', _.get(styles, BACKGROUND_COLOR) || 'bgpblue', 'bdt', 'bdpdkblue')}
      >
        {adType === IMAGE && (
          <WcmStyledPageImage
            data-qa="chase-banner-img"
            className="pb4"
            image={_.get(styles, BACKGROUND_IMAGE)}
            altText={_.get(styles, BACKGROUND_IMAGE_ALT_TEXT)}
          />
        )}
        {adType === MATH && (
          <div>
            <div data-qa="chase-banner" className={cx('pb4', 'flex', 'flex-column')}>
              <div className="flex flex-main-between yellow">
                <div>
                  <div
                    className={cx(
                      'p3 mb4 small inline-block rd2',
                      this._transformBannerStyles(
                        TOP_MESSAGE_TEXT_COLOR,
                        TOP_MESSAGE_TEXT_STYLE,
                        TOP_MESSAGE_BACKGROUND_COLOR
                      )
                    )}
                  >
                    {topMessageTextValue}
                  </div>
                  <div className={cx('xxlarge', this._transformBannerStyles(PRIMARY_TEXT_COLOR, PRIMARY_TEXT_STYLE))}>
                    {primaryTextValue}
                  </div>
                  <div className={cx('large', this._transformBannerStyles(SECONDARY_TEXT_COLOR, SECONDARY_TEXT_STYLE))}>
                    {secondaryTextValue}
                  </div>
                </div>
                <div>
                  <WcmStyledPageImage
                    data-qa="chase-banner"
                    className="pb4"
                    image={partnerImage}
                    altText="Chase Instant Credit Banner"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-column xlarge pb5">
              <div className="flex flex-main-between white pb1">
                <div
                  className={cx(this._transformBannerStyles(MATH_LINE_1_COLOR_LEFT, MATH_LINE_1_STYLE_LEFT), 'flex9')}
                >
                  {mathLine1TextValueLeft}
                </div>
                <div
                  className={cx(
                    this._transformBannerStyles(MATH_LINE_1_COLOR_RIGHT, MATH_LINE_1_STYLE_RIGHT),
                    'flex3 align-right'
                  )}
                >
                  <Currency {...totalFare} />
                </div>
              </div>
              <div className="flex flex-main-between yellow pb1">
                <div
                  className={cx(this._transformBannerStyles(MATH_LINE_2_COLOR_LEFT, MATH_LINE_2_STYLE_LEFT), 'flex9')}
                >
                  {mathLine2TextValueLeft}
                </div>
                <div
                  className={cx(
                    this._transformBannerStyles(MATH_LINE_2_COLOR_RIGHT, MATH_LINE_2_STYLE_RIGHT),
                    'flex3 align-right chase-instant-credit--statement-credit'
                  )}
                >
                  {'- '}
                  <Currency
                    className="inline-block"
                    amount={statementCredit.toFixed(2).toString()}
                    currencyCode={'USD'}
                    currencySymbol={'$'}
                  />
                </div>
              </div>
              <div className="flex flex-main-between white" data-qa="chase-adjusted-fare">
                <div
                  className={cx(this._transformBannerStyles(MATH_LINE_3_COLOR_LEFT, MATH_LINE_3_STYLE_LEFT), 'flex9')}
                >
                  {mathLine3TextValueLeft}
                </div>
                <div
                  className={cx(
                    this._transformBannerStyles(MATH_LINE_3_COLOR_RIGHT, MATH_LINE_3_STYLE_RIGHT),
                    'flex3 align-right'
                  )}
                >
                  {fare.adjustFareNegative && '- '}
                  <Currency className="inline-block" {...fare.adjustedFare} />
                </div>
              </div>
            </div>
          </div>
        )}
        <PlacementLink
          target={target}
          linkType={linkType}
          isChaseCombo={isChaseCombo}
          isChasePlacement={isChasePlacement}
          onClick={onClick}
          referrer={referrer}
          handlePlacementLinkFn={handlePlacementLinkFn}
          contentBlockId={contentBlockId}
          shouldRaiseSatelliteEvent={shouldRaiseSatelliteEvent}
          pageId={pageId}
        >
          <Button
            className={cx(_.get(styles, BUTTON_TYPE) || 'button--grey', 'pt5 chase-instant-credit--button')}
            size="larger"
            fluid
          >
            {buttonText}
          </Button>
        </PlacementLink>
      </div>
    );
  }
}
