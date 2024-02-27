// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';
import type { CarCompanyType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carCompany: CarCompanyType,
  group: number,
  onCarCompanySelectedFn: (CarCompanyType, number) => void,
  isWebView?: boolean
};

class CarCompanyCard extends React.Component<Props> {
  _onSelect = () => {
    const {
      carCompany: { name, vendorId, isSelected },
      group,
      onCarCompanySelectedFn
    } = this.props;
    const updatedCarCompany = { name, vendorId, isSelected: !isSelected };

    onCarCompanySelectedFn(updatedCarCompany, group);
  };

  render() {
    const {
      carCompany: { name, isSelected },
      isWebView
    } = this.props;

    return (
      <div className="car-company-card flex larger px0 py4 bdb ml5" onClick={this._onSelect}>
        <div className={cx('flex11', { py2: isWebView })}>
          {name === i18n('CAR_BOOKING__CAR_VENDOR__PARTNERS') ? (
            <span>
              {i18n('CAR_BOOKING__CAR_VENDOR__RAPID_REWARDS')}
              <sup>&reg;</sup>
              {i18n('CAR_BOOKING__CAR_VENDOR__PARTNERS')}
            </span>
          ) : (
            name
          )}
        </div>
        <div className={cx('sblue regular', { hide: !isSelected }, { xxlarge: isWebView })}>
          <Icon type={isWebView ? 'check-native' : 'check'} />
        </div>
      </div>
    );
  }
}

export default CarCompanyCard;
