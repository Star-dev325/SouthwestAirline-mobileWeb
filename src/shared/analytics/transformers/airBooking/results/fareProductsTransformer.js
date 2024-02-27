export const transformToFareProducts = (fares) =>
  (fares
    ? fares.map((fare) => {
      const price = fare.price ? fare.price.amount : 0.0;

      return {
        discountedFareValue: fare.discountedPrice ? fare.discountedPrice.amount : price,
        fareProductName: fare.fareDescription
      };
    })
    : []);
