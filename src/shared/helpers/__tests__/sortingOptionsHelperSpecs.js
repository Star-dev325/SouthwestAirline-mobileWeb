import { getSortingOptions } from 'src/shared/helpers/sortingOptionsHelper';
import SortingOptions from 'src/shared/constants/sortingOptions';

const { DEPARTURE_TIME, DURATION_MINUTES, NUMBER_OF_STOPS, STARTING_FROM_AMOUNT } = SortingOptions;

describe('Sorting Options Selector', () => {
  it('should get sortingOptions for adult paxType', () => {
    const sortingOptions = [
      {
        label: 'Depart Time',
        value: DEPARTURE_TIME
      },
      {
        label: 'Price',
        value: STARTING_FROM_AMOUNT
      },
      {
        label: 'Number of Stops',
        value: NUMBER_OF_STOPS
      },
      {
        label: 'Duration',
        value: DURATION_MINUTES
      }
    ];

    const result = getSortingOptions('adult');

    expect(result).to.deep.equal(sortingOptions);
  });

  it('should not include price as an option when shouldNotIncludePrice is true', () => {
    const sortingOptions = [
      {
        label: 'Depart Time',
        value: DEPARTURE_TIME
      },
      {
        label: 'Number of Stops',
        value: NUMBER_OF_STOPS
      },
      {
        label: 'Duration',
        value: DURATION_MINUTES
      }
    ];

    const result = getSortingOptions('adult', true);

    expect(result).to.deep.equal(sortingOptions);
  });
});
