// @flow
import React from 'react';
import _ from 'lodash';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import CarCompanyCard from 'src/carBooking/components/carCompanyCard';

import type { CarCompanyType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carVendors: Array<Array<CarCompanyType>>,
  onCarCompanyGroupSelectFn: (CarCompanyType, number) => void,
  onCarCompanySelectFn: (CarCompanyType, number) => void,
  onCarCompanySelectDoneFn: () => void,
  isWebView?: boolean
};

class CarBookingCompanyList extends React.Component<Props> {
  render() {
    const { carVendors, onCarCompanySelectDoneFn, onCarCompanySelectFn, onCarCompanyGroupSelectFn, isWebView } =
      this.props;

    return (
      <div className="bgwhite car-company-list-container">
        <PageHeaderWithButtons
          showBackButton={!isWebView}
          title="Select Car Companies"
          hidden={false}
          rightButtons={[{ name: 'Done', onClick: onCarCompanySelectDoneFn }]}
        />

        <div className="car-company-list ml5">
          {_.map(carVendors, (carVendorGroup, index: number) => (
            <div className="car-company-list--group" key={index}>
              {_.map(carVendorGroup, (carCompany, id: number) => (
                <CarCompanyCard
                  key={_.kebabCase(`${index}-${carCompany.name}`)}
                  carCompany={carCompany}
                  group={index}
                  onCarCompanySelectedFn={id === 0 ? onCarCompanyGroupSelectFn : onCarCompanySelectFn}
                  isWebView={isWebView}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CarBookingCompanyList;
