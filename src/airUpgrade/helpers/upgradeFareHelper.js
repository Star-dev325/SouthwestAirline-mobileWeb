// @flow
import type { UpgradeFareReservationDataType } from 'src/shared/flow-typed/shared.types';
import type { PricingDataType, BoundSelectionDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

export const buildUpgradeFareReservationRequest = ({
  firstName,
  lastName,
  recordLocator,
  passengerSearchToken,
  nonPremiumSearch,
  link
}: UpgradeFareReservationDataType) =>
  (link?.body?.passengerSearchToken
    ? link
    : {
      href: `/v1/mobile-air-booking/page/upgrade/${recordLocator}`,
      body: {
        firstName,
        lastName,
        recordLocator,
        passengerSearchToken,
        nonPremiumSearch
      },
      method: 'POST'
    });

export const getPricingChangeRequests = (
  changePricingLink: Link,
  pricingDataList: Array<PricingDataType>,
  boundSelectionDataList: Array<BoundSelectionDataType>
) => {
  const changeRequests = changePricingLink.body?.changeRequests ?? [];
  const fundsAppliedToken = changePricingLink.body?.fundsAppliedToken;

  const changeRequestsWithProductId = boundSelectionDataList.map<BoundSelectionDataType>(
    (boundSelectionDataType, index): BoundSelectionDataType => {
      const upgradeChangeRequest = changeRequests[index];

      if (boundSelectionDataType.canUpgrade) {
        const isSelected = pricingDataList.some(
          (pricingData) => pricingData.productId === boundSelectionDataType.productId && pricingData.isSelected
        );

        return isSelected
          ? {
            ...upgradeChangeRequest,
            productId: boundSelectionDataType.productId,
            arrivalAirportCode: boundSelectionDataType.arrivalAirportCode,
            departureAirportCode: boundSelectionDataType.departureAirportCode
          }
          : { ...upgradeChangeRequest };
      }

      return { ...upgradeChangeRequest };
    }
  );

  return { changeRequests: changeRequestsWithProductId, fundsAppliedToken };
};
