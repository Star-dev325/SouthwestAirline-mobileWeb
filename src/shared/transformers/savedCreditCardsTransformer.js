import _ from 'lodash';

export function groupCreditCards(savedCreditCards) {
  const primaryCardFromResponse = _.find(savedCreditCards, 'isPrimary');

  const rapidRewardsCard = _.find(savedCreditCards, 'isInstantCreditRapidRewardsCard');

  const cardsThatAreNotPrimaryNorTheyAreRapidRewardsChaseCards = _.filter(
    savedCreditCards,
    (savedCreditCard) => !savedCreditCard.isPrimary && !savedCreditCard.isInstantCreditRapidRewardsCard
  );

  const primaryCard = primaryCardFromResponse
    ? primaryCardFromResponse
    : cardsThatAreNotPrimaryNorTheyAreRapidRewardsChaseCards.shift();

  const groupedCreditCards = {
    primaryCard,
    cardsWithoutPrimary: cardsThatAreNotPrimaryNorTheyAreRapidRewardsChaseCards,
    rapidRewardsCard
  };

  return groupedCreditCards;
}
