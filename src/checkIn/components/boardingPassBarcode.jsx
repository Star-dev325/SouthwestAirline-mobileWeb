// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';

type Props = {
  barcodeString?: string,
  hasAList?: boolean,
  hasAListPreferred?: boolean,
  hasTsaPreCheck?: boolean,
  isInfant: boolean,
  showAirportLanes?: boolean,
  tier: string
};

const BoardingPassBarcode = (props: Props) => {
  const {
    barcodeString,
    hasAList = false,
    hasAListPreferred = false,
    hasTsaPreCheck,
    isInfant = false,
    showAirportLanes = false
  } = props;

  const _renderBarcodeImage = () => {
    const barcodeUrlSegment = `/v1/mobile-air-operations/feature/check-in/barcode?barcode=${barcodeString || ''}`;
    const barcodeImageUrl =
      barcodeString && environment.apiUrl && environment.apiUrl.length
        ? url.resolve(environment.apiUrl, `/api/mobile-air-operations${barcodeUrlSegment}`)
        : url.resolve(environment.chapiAirOperations, barcodeUrlSegment);

    return (
      barcodeString && (
        <div>
          {isInfant && (
            <div className="mbp-barcode-lap-infant">
              <img alt="Lap Infant" src="/content/mkt/images/landing_pages/lap-child.svg" />
              <p>{i18n('SHARED__LAP_CHILD__TITLE_BOARDING_PASS')}</p>
            </div>
          )}
          <img className="mbp-barcode-image" src={barcodeImageUrl} />
        </div>
      )
    );
  };

  return (
    // TODO https://jira-tools.swacorp.com/browse/MOB-123849
    <>
      <div className="mbp-barcode-reservation-assets mt4">
        {hasTsaPreCheck && (
          <img
            alt="TSA PreCheck"
            className="mbp-barcode-reservation-assets--icon"
            src="/content/mkt/images/landing_pages/boardingPass/tsa.svg"
          />
        )}
        {hasAListPreferred && (
          <img
            alt="A-List Preferred"
            className="mbp-barcode-reservation-assets--icon"
            src="/content/mkt/images/landing_pages/boardingPass/alp.svg"
          />
        )}
        {hasAList && (
          <img
            alt="A-List"
            className="mbp-barcode-reservation-assets--icon"
            src="/content/mkt/images/landing_pages/boardingPass/al.svg"
          />
        )}
        {showAirportLanes && (
          <img
            alt="priority or express lanes"
            className="mbp-barcode-reservation-assets--icon"
            src="/content/mkt/images/landing_pages/boardingPass/pel.svg"
          />
        )}
      </div>

      <div className="mbp-barcode-block">{barcodeString && _renderBarcodeImage()}</div>
    </>
  );
};

export default BoardingPassBarcode;
