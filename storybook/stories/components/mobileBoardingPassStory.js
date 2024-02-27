import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import MobileBoardingPass from 'src/checkIn/components/mobileBoardingPass';
import { convertBackgroundBrandColorToHexCode } from 'src/shared/helpers/productDefinitionsHelper';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';

const drinkCouponText = 'DrinkCouponText';

const props = {
  mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().setDrinkCoupon(false, drinkCouponText).build()
    .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
};

const renderBackgroundColor = (style) => {
  const { gradientEnd, gradientStart } = style;
  const gradientEndColor = convertBackgroundBrandColorToHexCode(gradientEnd, '#111b40');
  const gradientStartColor = convertBackgroundBrandColorToHexCode(gradientStart, '#304cb2');

  return { gradientEndColor, gradientStartColor };
};

const withGradientBackground = (Component: *) => (props) => {
  const { gradientEndColor, gradientStartColor } = renderBackgroundColor(props.mobileBoardingPass.style);
  return (
    <div
      className="bdsdkblue bdt p5"
      style={{ background: `linear-gradient(${gradientStartColor}, ${gradientEndColor})` }}
    >
      <Component {...props} />
    </div>
  );
};
const EnhancedMobileBoardingPass = withGradientBackground(MobileBoardingPass);

storiesOf('components/mobileBoardingPass', module)
  .add('default', () => {
    return <EnhancedMobileBoardingPass {...props} isIOSDevice={false} isAndroidDevice={false} />;
  })
  .add('default security document', () => {
    const newProps = {
      mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
    };

    return <EnhancedMobileBoardingPass {...newProps} isIOSDevice={false} isAndroidDevice={false} />;
  })
  .add('with lap infant', () => {
    const lapInfantStyle = {
      mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().withLapInfant().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
    };

    return <EnhancedMobileBoardingPass {...lapInfantStyle} isIOSDevice={true} isAndroidDevice={false} />;
  })
  .add('with lap infant security document', () => {
    const lapInfantSecurityDocumentStyle = {
      mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().withLapInfantSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
    };

    return <EnhancedMobileBoardingPass {...lapInfantSecurityDocumentStyle} isIOSDevice={true} isAndroidDevice={false} />;
  })
  .add('adult with lap infant', () => {
    const adultWithLapInfantStyle = {
      mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().adultWithLapInfant().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
    };

    return <EnhancedMobileBoardingPass {...adultWithLapInfantStyle} isIOSDevice={true} isAndroidDevice={false} />;
  })
  .add('default Android', () => {
    return <EnhancedMobileBoardingPass {...props} isIOSDevice={false} isAndroidDevice={true} />;
  })
  .add('default iOS', () => {
    return <EnhancedMobileBoardingPass {...props} isIOSDevice={true} isAndroidDevice={false} />;
  })
  .add('with boarding reservation assets', () => {
    const props = {
      mobileBoardingPass: new CheckInRetrieveBoardingPassBuilder().setBoardingReservationAssets().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0]
    };

    return <EnhancedMobileBoardingPass {...props} isIOSDevice={true} isAndroidDevice={false} />;
  });
