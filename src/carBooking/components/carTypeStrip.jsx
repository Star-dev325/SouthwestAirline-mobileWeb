// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import Currency from 'src/shared/components/currency';
import * as VehicleTypesHelper from 'src/carBooking/helpers/vehicleTypesHelper';

import type { CarClassResultType, GroupedCarResultMapType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  selectedCarType: string,
  carResults: GroupedCarResultMapType,
  onCarTypeChangedFn: (string) => void,
  className?: string
};

type State = {
  currentCenterIndex: number
};

class CarTypeStrip extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this._getStateFromProps(props);
  }

  _getStateFromProps = (theProps: Props) => {
    const { carResults } = this.props;
    const { selectedCarType } = theProps;
    const carTypesArray = _.keys(carResults);
    const index = carTypesArray.indexOf(selectedCarType);

    return {
      currentCenterIndex: index
    };
  };

  _shouldShowPreviousLink(displayTypes: Array<number>): boolean {
    return displayTypes[0] > 0;
  }

  _shouldShowNextLink(displayTypes: Array<number>): boolean {
    const { carResults } = this.props;
    const carTypesArray = _.keys(carResults);

    return displayTypes[2] < carTypesArray.length - 1;
  }

  _getTypeIndexToDisplay = (): Array<number> => {
    const { currentCenterIndex } = this.state;

    const prevIndex = currentCenterIndex - 1;
    const currentIndex = currentCenterIndex;
    const nextIndex = currentIndex + 1;

    return [prevIndex, currentIndex, nextIndex];
  };

  _onClick = (carTypeIndex: number, isCurrentSelectedIndex: boolean = false) => {
    const { carResults, onCarTypeChangedFn } = this.props;
    const carTypesArray = _.keys(carResults);

    if (carTypeIndex < 0 || carTypeIndex >= carTypesArray.length || isCurrentSelectedIndex) {
      return;
    }

    this.setState(
      {
        currentCenterIndex: carTypeIndex
      },
      _.isFunction(onCarTypeChangedFn) && onCarTypeChangedFn(carTypesArray[carTypeIndex])
    );
  };

  _renderLowestPrice = (carTypeDetail: CarClassResultType) =>
    (carTypeDetail.isAllVendorUnavailable ? (
      'Unavailable'
    ) : (
      <div>
        <i>{'from '}</i>
        <Currency {...carTypeDetail.lowestPriceWithCurrencyCode} className={'car-type-strip--currency'} ceil />
      </div>
    ));

  _renderItemDetail = (vehicleTypeName: string, carTypeDetail: ?CarClassResultType) => {
    if (!carTypeDetail) {
      return;
    }

    return (
      <div>
        <div>{vehicleTypeName}</div>
        {this._renderLowestPrice(carTypeDetail)}
      </div>
    );
  };

  _onArrowClick = (isLeftArrow: boolean = true) => {
    const { currentCenterIndex } = this.state;
    const { carResults } = this.props;

    const leftIndex = _.max([currentCenterIndex - 3, 1]);
    const rightIndex = _.min([currentCenterIndex + 3, _.keys(carResults).length - 2]);

    this.setState({
      currentCenterIndex: isLeftArrow ? leftIndex : rightIndex
    });
  };

  _getTabIndexFromCarType = () => {
    const { carResults, selectedCarType } = this.props;
    const carTypesArray = _.keys(carResults);

    return carTypesArray.indexOf(selectedCarType);
  };

  render() {
    const { carResults, className } = this.props;
    const currentSelectedIndex = this._getTabIndexFromCarType();
    const displayTypes = this._getTypeIndexToDisplay();
    const shouldShowPreviousLink = this._shouldShowPreviousLink(displayTypes);
    const shouldShowNextLink = this._shouldShowNextLink(displayTypes);

    return (
      <div className={cx('car-type-strip', className)}>
        {shouldShowPreviousLink && (
          <div ref="previousButton" onClick={this._onArrowClick}>
            <Icon className="xxxlarge yellow l0" type="keyboard-arrow-left" />
          </div>
        )}
        <ul className="car-type-strip--content">
          {_.map(displayTypes, (carTypeIndex, index: number) => {
            const carTypesArray = _.keys(carResults);
            const carType = carTypesArray[carTypeIndex];
            const carTypeDetail = carResults[carType];
            const vehicleTypeName = VehicleTypesHelper.typeToLabel(carType);
            const isCurrentSelectedCarType = _.isEqual(carTypeIndex, currentSelectedIndex);

            const classes = cx({
              'car-type-strip--item': true,
              active: isCurrentSelectedCarType,
              disabled: carTypeDetail ? carTypeDetail.isAllVendorUnavailable : true
            });

            return (
              <li className={classes} key={index} onClick={() => this._onClick(carTypeIndex, isCurrentSelectedCarType)}>
                {this._renderItemDetail(vehicleTypeName, carTypeDetail)}
              </li>
            );
          })}
        </ul>
        {shouldShowNextLink && (
          <div ref="nextButton" onClick={this._onArrowClick.bind(null, false)}>
            <Icon className="xxxlarge yellow r0" type="keyboard-arrow-right" />
          </div>
        )}
      </div>
    );
  }
}

export default CarTypeStrip;
