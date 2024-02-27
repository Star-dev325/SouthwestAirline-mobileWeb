// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import CarBookingCompanyList from 'src/carBooking/components/carBookingCompanyList';
import { CAR_BOOKING_COMPANY_MODAL_ID } from 'src/carBooking/constants/carBookingConstants';
import {
  transformToCarCompanyList,
  transformToCarCompanyViewValue
} from 'src/carBooking/transformers/carVendorTransformer';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import withField from 'src/shared/form/enhancers/withField';

import type { CarCompanyType, CarVendorType, CompanyVendorType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carVendors: Array<CarVendorType>,
  isWebView?: boolean,
  name: string,
  onChange: (*) => void,
  retrieveCarVendorsFn: () => void,
  value: string | Array<CompanyVendorType>
};

type State = {
  carCompanyArray: Array<Array<CarCompanyType>>,
  viewValue: string
};

class CarBookingCompanySelectorField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { carVendors, value } = this.props;
    const viewValue = _.isEmpty(carVendors) ? 'Shop all' : transformToCarCompanyViewValue(carVendors, value);

    this.state = {
      viewValue,
      carCompanyArray: transformToCarCompanyList(carVendors, value)
    };
  }

  areCarVendorListsEqual = (vendors1, vendors2) =>
    vendors1.length === vendors2.length &&
    vendors1.filter((vendor, index) => vendor.vendorId === vendors2[index].vendorId).length === vendors1.length;

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { carVendors, value } = nextProps;

    const viewValue = transformToCarCompanyViewValue(carVendors, value);

    this.setState({
      carCompanyArray: this.areCarVendorListsEqual(nextProps.carVendors, this.props.carVendors)
        ? this.state.carCompanyArray
        : transformToCarCompanyList(carVendors, value),
      viewValue
    });
  }

  _onCarCompanyGroupSelectFn = (carCompany: CarCompanyType, groupIndex: number) => {
    const { carCompanyArray } = this.state;
    const { name, isSelected } = carCompany;

    if (name === i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OPTION')) {
      _.forEach(carCompanyArray, (carVendorGroup) => {
        this._selectCarCompanyGroup(carVendorGroup, isSelected);
      });
    } else if (
      name === i18n('CAR_BOOKING__CAR_VENDOR__RAPID_REWARDS_PARTNERS') ||
      name === i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OTHERS_OPTION')
    ) {
      this._selectCarCompanyGroup(carCompanyArray[groupIndex], isSelected);
    }

    const carCompanyGroup = carCompanyArray[groupIndex];
    const notAllChildOptionSelected = _.chain(carCompanyGroup)
      .slice(1, carCompanyGroup.length)
      .map('isSelected')
      .includes(false)
      .value();

    notAllChildOptionSelected
      ? this.setState(_.merge(carCompanyArray[groupIndex][0], { isSelected: false }))
      : this.setState(_.merge(carCompanyArray[groupIndex][0], { isSelected: true }));

    this.setState(
      _.merge(carCompanyArray[0][0], {
        isSelected: carCompanyArray[1][0].isSelected && carCompanyArray[2][0].isSelected
      })
    );
  };

  _onCarCompanySelectFn = (carCompany: CarCompanyType, groupIndex: number) => {
    const { carCompanyArray } = this.state;
    const carVendorGroup = carCompanyArray[groupIndex];
    const index = _.findIndex(carVendorGroup, (company) => company.name === carCompany.name);

    carVendorGroup[index] = carCompany;

    if (carCompany.isSelected) {
      const notAllChildOptionSelected = _.chain(carVendorGroup)
        .slice(1, carVendorGroup.length)
        .map('isSelected')
        .includes(false)
        .value();

      carCompanyArray[groupIndex][0].isSelected = !notAllChildOptionSelected;
      carCompanyArray[0][0].isSelected = carCompanyArray[1][0].isSelected && carCompanyArray[2][0].isSelected;
    } else {
      carCompanyArray[0][0].isSelected = false;
      carCompanyArray[groupIndex][0].isSelected = false;
    }
    this.setState({ carCompanyArray });
  };

  _onDoneClickFn = () => {
    const { carCompanyArray } = this.state;
    const { onChange } = this.props;

    let selectedVendors;
    const rapidRewordsPartnerSelected: Array<CarCompanyType> = [];
    const rapidRewordsPartnerUnselected: Array<CarCompanyType> = [];
    const allOthersSelected: Array<CarCompanyType> = [];
    const allOthersUnselected: Array<CarCompanyType> = [];

    _.forEach(carCompanyArray[1].slice(1, carCompanyArray[1].length), (carVendor) => {
      carVendor.isSelected
        ? rapidRewordsPartnerSelected.push(carVendor)
        : rapidRewordsPartnerUnselected.push(carVendor);
    });
    _.forEach(carCompanyArray[2].slice(1, carCompanyArray[2].length), (carVendor) => {
      carVendor.isSelected ? allOthersSelected.push(carVendor) : allOthersUnselected.push(carVendor);
    });
    const shopAllSelect = carCompanyArray[0][0].isSelected;
    const nothingSelect = rapidRewordsPartnerSelected.length + allOthersSelected.length === 0;

    if (shopAllSelect || nothingSelect) {
      selectedVendors = i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
    } else {
      selectedVendors = this._getVendorIdAndName(rapidRewordsPartnerSelected.concat(allOthersSelected));
    }

    onChange(selectedVendors);
    hideFullScreenModal(CAR_BOOKING_COMPANY_MODAL_ID);
  };

  _selectCarCompanyGroup = (carVendors: Array<CarCompanyType>, isSelected: boolean) => {
    _.forEach(carVendors, (carVendor) => {
      carVendor.isSelected = isSelected;
    });
  };

  _getVendorIdAndName = (vendorList: Array<CarCompanyType>) =>
    _.map(vendorList, (vendor) => ({
      vendorId: vendor.vendorId,
      vendorName: vendor.name
    }));

  _openSelectCarVendorPage = () => {
    const { carVendors, retrieveCarVendorsFn, value } = this.props;

    if (_.isEmpty(carVendors)) {
      retrieveCarVendorsFn && retrieveCarVendorsFn();
    }
    const carCompanyArray = transformToCarCompanyList(carVendors, value);

    this.setState({ carCompanyArray });
    showFullScreenModal(CAR_BOOKING_COMPANY_MODAL_ID);
  };

  render() {
    const { viewValue, carCompanyArray } = this.state;
    const { isWebView } = this.props;

    return (
      <div>
        <div
          className="flex flex-main-between flex-cross-center px5"
          onClick={this._openSelectCarVendorPage}
          data-qa="car-companies"
        >
          <label className="xlarge">{i18n('CAR_BOOKING__CAR_VENDOR_FORM__TITLE')}</label>
          <div data-qa="car-booking-company" className="gray4">
            {viewValue}
          </div>
        </div>
        <FullScreenModal id={CAR_BOOKING_COMPANY_MODAL_ID}>
          <CarBookingCompanyList
            carVendors={carCompanyArray}
            isWebView={isWebView}
            onCancel={() => hideFullScreenModal(CAR_BOOKING_COMPANY_MODAL_ID)}
            onCarCompanyGroupSelectFn={this._onCarCompanyGroupSelectFn}
            onCarCompanySelectDoneFn={this._onDoneClickFn}
            onCarCompanySelectFn={this._onCarCompanySelectFn}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withField()(CarBookingCompanySelectorField);
