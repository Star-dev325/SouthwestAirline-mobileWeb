import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import CompanionPersonalInfo from 'src/companion/components/companionPersonalInfo';
import GenderTypes from 'src/shared/form/constants/genderTypes';

describe('companionPersonalInfo', () => {
  const propsWithCompanionInfo = {
    companionInfo: {
      birthDate: '1989-02-25',
      gender: 'Male',
      name: {
        firstName: 'James',
        lastName: 'Merson'
      },
      suffix: 'JR'
    }
  };

  it('should render person name correctly', () => {
    const { container } = createComponent(propsWithCompanionInfo);
    const formattedName = container.querySelector('.companion-personal-info--name');

    expect(formattedName).toHaveTextContent('James Merson JR');
  });

  it('should render person birth date correctly', () => {
    const { container } = createComponent(propsWithCompanionInfo);
    const birthDate = container.querySelector('[data-qa="companion-personal-info--birth-date"]');

    expect(birthDate).toHaveTextContent(`${i18n('COMPANION_DATE_OF_BIRTH')}2/25/1989`);
  });

  it('should render person gender correctly', () => {
    const { container } = createComponent(propsWithCompanionInfo);
    const gender = container.querySelector('[data-qa="companion-personal-info--gender"]');

    expect(gender).toHaveTextContent(`${i18n('COMPANION_GENDER')}Male`);
  });

  it('should not render date of birth if it is empty', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '',
        gender: 'Male',
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const { container } = createComponent(props);
    const birthDate = container.querySelector('[data-qa="companion-personal-info--birth-date"]');

    expect(birthDate).toBeNull();
  });

  it('should not render gender if it is empty', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '1989-02-25',
        gender: '',
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const { container } = createComponent(props);
    const gender = container.querySelector('[data-qa="companion-personal-info--gender"]');

    expect(gender).toBeNull();
  });

  it('should not render gender if it is UNAVAILABLE', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '1989-02-25',
        gender: GenderTypes.UNAVAILABLE,
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const { container } = createComponent(props);
    const gender = container.querySelector('[data-qa="companion-personal-info--gender"]');

    expect(gender).toBeNull();
  });

  it('should not render suffix if it is null', () => {
    const props = {
      companionInfo: {
        gender: 'Male',
        suffix: null,
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const { container } = createComponent(props);
    const formattedName = container.querySelector('.companion-personal-info--name');

    expect(formattedName).toHaveTextContent('James Merson');
  });

  describe('name as string type', () => {
    it('should render name with suffix if it is null', () => {
      const props = {
        companionInfo: {
          gender: 'Male',
          suffix: 'JR',
          name: 'James Merson'
        }
      };
      const { container } = createComponent(props);
      const formattedName = container.querySelector('.companion-personal-info--name');

      expect(formattedName).toHaveTextContent('James Merson JR');
    });

    it('should not render suffix if it is null', () => {
      const props = {
        companionInfo: {
          gender: 'Male',
          suffix: null,
          name: 'James Merson'
        }
      };
      const { container } = createComponent(props);

      expect(container.querySelector('.companion-personal-info--name')).toHaveTextContent('James Merson');
    });
  });

  const createComponent = (props) => render(<CompanionPersonalInfo {...props} />);
});
