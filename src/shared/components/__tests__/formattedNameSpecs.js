import React from 'react';
import { shallow } from 'enzyme';
import FormattedName from 'src/shared/components/formattedName';

describe('FormattedName', () => {
  it('should apply title case capitalization', () => {
    const props = {
      name: {
        firstName: 'CAPS',
        lastName: 'Two words'
      }
    };

    const formattedName = createComponent(props);

    expect(formattedName.find('[data-qa="userName"]')).to.have.text('Caps Two Words');
  });

  it('should apply title case capitalization when name contains hyphen or apostrophe', () => {
    const props = {
      name: {
        firstName: 'MARY-JANE',
        lastName: "O'NEIL"
      }
    };
    const formattedName = createComponent(props);

    expect(formattedName.find('[data-qa="userName"]')).to.have.text("Mary-Jane O'Neil");
  });

  it('should render the formatted name with prefix content', () => {
    const props = {
      name: {
        firstName: 'JOHN',
        lastName: 'DOE'
      },
      prefixContent: 'Mr. '
    };

    const formattedName = createComponent(props);

    expect(formattedName.find('[data-qa="userName"]')).to.have.text('Mr. John Doe');
  });

  it('should render the name when name is a plain string', () => {
    const props = {
      name: 'Li Jie',
      prefixContent: 'Mr. '
    };

    const formattedName = createComponent(props);

    expect(formattedName.find('[data-qa="userName"]')).to.have.text('Mr. Li Jie');
  });

  const createComponent = (props) => shallow(<FormattedName {...props} />);
});
