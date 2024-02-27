import _ from 'lodash';

const SUFFIXES = [
  'i',
  'ii',
  'iii',
  'iv',
  'v',
  'vi',
  'ceo',
  'clu',
  'cpa',
  'dc',
  'dds',
  'do',
  'dpm',
  'dvm',
  'jr',
  'md',
  'od',
  'phd',
  'rn',
  'sr'
];

const normalize = (string) => (_.isEmpty(string) ? null : string);

const areNamesEqual = (passenger1, passenger2) => {
  const passengerOne = getSuffixFromFirstName(_.cloneDeep(passenger1));
  const passengerTwo = getSuffixFromFirstName(_.cloneDeep(passenger2));

  return (
    normalize(passengerOne.firstName) === normalize(passengerTwo.firstName) &&
    normalize(passengerOne.lastName) === normalize(passengerTwo.lastName) &&
    normalize(passengerOne.middleName) === normalize(passengerTwo.middleName) &&
    normalize(passengerOne.suffix) === normalize(passengerTwo.suffix)
  );
};

const getSuffixFromFirstName = (passenger) => {
  const splitFirstName = _.get(passenger, 'firstName').trim().split(/\s+/);
  const suffix = _.last(splitFirstName);

  if (splitFirstName.length > 1 && _.indexOf(SUFFIXES, suffix.toLowerCase()) > -1) {
    passenger.firstName = _.head(splitFirstName);
    passenger.suffix = suffix;
  }

  return passenger;
};

export default areNamesEqual;
