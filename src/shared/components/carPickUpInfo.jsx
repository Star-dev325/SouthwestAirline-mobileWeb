// @flow
import React from 'react';
import dayjs from 'dayjs';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';
import HorizontalLabelContainer from 'src/shared/components/horizontalLabelContainer';
import i18n from '@swa-ui/locale';

export type CarPickUpProps = {
  vendorImage?: string,
  pickUpTime: string,
  cityName: string,
  cityState: string
};

type Props = {
  className: string
} & CarPickUpProps;

const CarPickUpInfo = (props: Props) => {
  const { className, vendorImage, pickUpTime, cityName, cityState } = props;

  return (
    <div className={className}>
      <div>
        <WcmStyledPageImage className="car-vendor-logo" image={vendorImage} />
      </div>
      <div className="py4">
        <HorizontalLabelContainer
          label={i18n('CAR_BOOKING__CAR_RESERVATION__PICK_UP_SENTENCE_CASE')}
          labelClassName="xlarge"
        >
          <div data-qa="pickupTime" className="xlarge">
            {dayjs(pickUpTime).format('M/DD/YYYY')}
          </div>
        </HorizontalLabelContainer>
        <HorizontalLabelContainer label={i18n('CAR_BOOKING__CAR_RESERVATION__FROM')} labelClassName="xlarge">
          <div data-qa="pickupLocation" className="xlarge nowrap overflow-hidden ellipsis">
            {cityName}, {cityState}
          </div>
        </HorizontalLabelContainer>
      </div>
    </div>
  );
};

export default CarPickUpInfo;
