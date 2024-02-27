import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';

describe('<MultiDayIndicator />', () => {
  it('should render nothing when neither isOvernight nor isNextDay is true', () => {
    const { container } = render(<MultiDayIndicator />);

    expect(container.firstChild).toBeNull();
  });

  it('should render the Overnight indicator correctly', () => {
    const { container } = render(<MultiDayIndicator isOvernight />);
    
    expect(container).toMatchSnapshot();
  });

  it('should render the NextDay indicator correctly', () => {
    const { container } = render(<MultiDayIndicator isNextDay />);
    
    expect(container).toMatchSnapshot();
  });

  it('should render the Overnight indicator when only isOvernight is true', () => {
    const { queryByText } = render(<MultiDayIndicator isOvernight />);
    
    expect(queryByText(i18n('AIR_BOOKING__SHOPPING__OVERNIGHT'))).not.toBeNull();
  });

  it('should render the Overnight indicator when both isOvernight and isNextDay are true, and shouldPrioritizeNextDay is false', () => {
    const { queryByText } = render(
      <MultiDayIndicator isOvernight isNextDay shouldPrioritizeNextDay={false} />
    );
    
    expect(queryByText(i18n('AIR_BOOKING__SHOPPING__OVERNIGHT'))).not.toBeNull();
  });

  it('should render the Next Day indicator when only isNextDay is true, and hideIsNextDay is false', () => {
    const { queryByText } = render(<MultiDayIndicator isNextDay />);
    
    expect(queryByText(i18n('AIR_BOOKING__SHOPPING__NEXT_DAY'))).not.toBeNull();
  });

  it('should render nothing when only isNextDay is true, and hideIsNextDay is true', () => {
    const { container } = render(<MultiDayIndicator isNextDay hideIsNextDay />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should render isNextDay when both isOvernight and isNextDay are true, and shouldPrioritizeNextDay is true', () => {
    const { queryByText } = render(<MultiDayIndicator isOvernight isNextDay shouldPrioritizeNextDay />);
    
    expect(queryByText(i18n('AIR_BOOKING__SHOPPING__NEXT_DAY'))).not.toBeNull();
  });

  it('should render the Overnight indicator with orange color when shouldDisplayOrangeOvernight is true', () => {
    const { container } = render(<MultiDayIndicator isOvernight shouldDisplayOrangeOvernight />);
    
    expect(container.querySelector('.multi-day-indicator--overnight-orange')).not.toBeNull();
  });

  it('should render the Overnight indicator with smaller size when shouldDisplaySmallerSize is true', () => {
    const { container } = render(<MultiDayIndicator isOvernight shouldDisplaySmallerSize />);
    
    expect(container.querySelector('.multi-day-indicator--icon-smaller')).not.toBeNull();
  });
});
