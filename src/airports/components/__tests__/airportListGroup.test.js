import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AirportListGroup from 'src/airports/components/airportListGroup';
import { MULTI_SELECT_GROUP_FORM_ORIGIN } from 'src/shared/constants/formIds';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

describe('AirportListGroup', () => {
  let clearFormDataByIdStub;
  let setAirportGroupDataStub;
  let updateFormDataValueStub;

  const defaultStoreData = {
    app: {
      formData: {
        MULTI_SELECT_GROUP_FORM_ORIGIN: {
          data: {
            BDL: true,
            BOS: true,
            BOT: true,
            MHT: true,
            PVD: true
          }
        }
      }
    }
  };

  beforeEach(() => {
    clearFormDataByIdStub = jest.fn();
    setAirportGroupDataStub = jest.fn();
    updateFormDataValueStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render with checkboxes when it is an area airport group and isMultiSelectGroupEnabled is true', () => {
    const { container } = createComponent(
      {
        isMultiSelectGroupEnabled: true,
        handleMultiSelectRecentSearch: jest.fn()
      },
      defaultStoreData
    );
    const AirportListGroupWrapper = container.querySelector('.checkbox-button');

    expect(AirportListGroupWrapper).toMatchSnapshot();
  });

  it('should not render airport group header when isReaccomCoTerminalEligible is true', () => {
    const { container } = createComponent({ isReaccomCoTerminalEligible: true });

    expect(container).toMatchSnapshot();
  });

  it('should check all multiselectgroups when airport group is checked', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              BDL: false,
              BOS: false,
              BOT: false,
              MHT: false,
              PVD: false
            }
          }
        }
      }
    };
    const { container } = createComponent({ isMultiSelectGroupEnabled: true }, mockStoreData);

    fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);

    expect(clearFormDataByIdStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN);
    expect(setAirportGroupDataStub).toHaveBeenCalledWith(['BOS', 'PVD', 'MHT', 'BDL']);
    expect(updateFormDataValueStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN, {
      BDL: true,
      BOS: true,
      MHT: true,
      PVD: true
    });
  });

  it('should remove all multiselectgroups selection when airport group is unchecked', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              BDL: false,
              BOS: false,
              BOT: true,
              MHT: false,
              PVD: false
            }
          }
        }
      }
    };
    const { container } = createComponent({ isMultiSelectGroupEnabled: true }, mockStoreData);

    fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);

    expect(clearFormDataByIdStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN);
    expect(setAirportGroupDataStub).toHaveBeenCalledWith([]);
    expect(updateFormDataValueStub).not.toHaveBeenCalled();
  });

  it('should check the airport and update the airport in the airportListGroups state', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              BDL: false,
              BOS: false,
              BOT: false,
              MHT: false,
              PVD: false
            }
          }
        }
      }
    };
    const { container } = createComponent({ isMultiSelectGroupEnabled: true }, mockStoreData);

    fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

    expect(setAirportGroupDataStub).toHaveBeenCalledWith(['BOS']);
  });

  it('should remove the airport from airportListGroups state, when airport is unchecked', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              BDL: true,
              BOS: true,
              BOT: true,
              MHT: true,
              PVD: true
            }
          }
        }
      }
    };
    const { container } = createComponent(
      { isMultiSelectGroupEnabled: true, airportGroupData: ['BDL', 'BOS', 'MHT', 'PVD'] },
      mockStoreData
    );

    fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

    expect(setAirportGroupDataStub).toHaveBeenCalledWith(['BDL', 'MHT', 'PVD']);
    expect(updateFormDataValueStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN, { BOT: false });
  });

  it('should select the airport group when all the child airports are selected', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              ISP: true,
              LGA: false
            }
          }
        }
      }
    };
    const expectedGroupData = ['ISP', 'LGA'];
    const { container } = createComponent(
      { isMultiSelectGroupEnabled: true, group: 'New York Area Airports', airportGroupData: ['ISP'] },
      mockStoreData
    );

    fireEvent.click(container.querySelectorAll('.checkbox-button')[2]);

    expect(setAirportGroupDataStub).toHaveBeenCalledWith(expectedGroupData);
    expect(updateFormDataValueStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN, { NWY: true });
  });

  it('should check the airport from different group which clear out the airportListGroups state', () => {
    const mockStoreData = {
      app: {
        formData: {
          MULTI_SELECT_GROUP_FORM_ORIGIN: {
            data: {
              BDL: false,
              BOS: false,
              BOT: false,
              MHT: false,
              PVD: false
            }
          }
        }
      }
    };
    const { container } = createComponent(
      {
        airportGroupData: ['BDL', 'BOS', 'MHT', 'PVD'],
        group: 'New York Area Airports',
        isMultiSelectGroupEnabled: true
      },
      mockStoreData
    );

    fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

    expect(clearFormDataByIdStub).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_ORIGIN);
    expect(setAirportGroupDataStub).toHaveBeenCalledWith(['ISP']);
  });

  const createComponent = (props, storeData = defaultStoreData) => {
    const defaultGroup = props?.group ?? 'Boston Area Airports';

    const defaultProps = {
      airportGroupData: [],
      airports: props?.airports ?? getMultiSelectGroup()[defaultGroup],
      clearFormDataById: clearFormDataByIdStub,
      disableInternationals: false,
      formId: MULTI_SELECT_GROUP_FORM_ORIGIN,
      group: defaultGroup,
      groupId: 'BOT',
      isMultiSelectGroupEnabled: false,
      isReaccomCoTerminalEligible: false,
      onAirportSelect: () => {},
      setAirportGroupData: setAirportGroupDataStub,
      updateFormDataValueFn: updateFormDataValueStub
    };
    const combinedProps = { ...defaultProps, ...props };

    const Component = () => (
      <Provider store={configureMockStore()(storeData)}>
        <AirportListGroup {...combinedProps} />
      </Provider>
    );

    return render(<Component />);
  };
});
