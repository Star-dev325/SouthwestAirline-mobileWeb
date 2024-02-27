import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import InternalReferenceNumberField from 'src/shared/form/fields/internalReferenceNumberField';
import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('InternalReferenceNumberField', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});
  const defaultIrnInfo = {
    irnRequired: false,
    alternateIrnAllowed: true,
    companyInternalReferenceNumbers: [
      {
        name: 'IrnName',
        description: 'IrnDescription'
      },
      {
        name: 'Companyirn123',
        description: 'companyirndescription'
      }
    ],
    travelerInternalReferenceNumbers: [
      {
        name: '253376',
        description: 'Legal Department'
      }
    ]
  };
  let wrapper;

  beforeEach(() => {
    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('irn is required, alternative is false', () => {
    it('has only 1 IRN', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: false,
        preselectedInternalReferenceNumber: {
          name: 'IrnName',
          description: 'IrnDescription'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: '' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: '' });
      expect(wrapper.find('NavItemLink')).to.have.props({ disabled: true });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
    it('has multiple IRN without selectedIrn object', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: false,
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo);
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'exclamation-circle warning' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: '' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('Select ');
    });
    it('has multiple IRN with selectedIrn object', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: false,
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
  });

  context('irn is required, alternative is true', () => {
    it('has no IRN', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: true
      };

      wrapper = createComponent(irnInfo);
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'exclamation-circle warning' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: '' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('Select ');
    });
    it('has only 1 IRN', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: true,
        preselectedInternalReferenceNumber: {
          name: 'IrnName',
          description: 'IrnDescription'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          }
        ]
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
    it('has multiple IRN without selectedIrn object', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: true,
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo);
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'exclamation-circle warning' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: '' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('Select ');
    });
    it('has multiple IRN with selectedIrn', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: true,
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });

    it('has multiple IRN with selectedIrn object', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: true,
        preselectedInternalReferenceNumber: {
          name: 'IrnName',
          description: 'IrnDescription'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ],
        travelerInternalReferenceNumbers: []
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
  });

  context('irn is not required, alternative is false', () => {
    it('has no IRN', () => {
      const irnInfo = {
        irnRequired: false,
        alternateIrnAllowed: true
      };

      wrapper = createComponent(irnInfo);
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text(
        'Internal reference number (optional)'
      );
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.exist;
    });
    it('has only 1 IRN', () => {
      const irnInfo = {
        irnRequired: false,
        alternateIrnAllowed: true,
        preselectedInternalReferenceNumber: {
          name: 'IrnName',
          description: 'IrnDescription'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          }
        ]
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
    it('has multiple IRN without selectedIrn object', () => {
      const irnInfo = {
        irnRequired: false,
        alternateIrnAllowed: true,
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ]
      };

      wrapper = createComponent(irnInfo);
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('Select (optional)');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.exist;
    });
    it('has multiple IRN with selectedIrn object', () => {
      const irnInfo = {
        irnRequired: false,
        alternateIrnAllowed: true,
        companyInternalReferenceNumbers: [
          {
            name: 'IrnName',
            description: 'IrnDescription'
          },
          {
            name: 'Companyirn123',
            description: 'companyirndescription'
          }
        ]
      };

      wrapper = createComponent(irnInfo, { selectedIrn: 'IrnName' });
      expect(wrapper.find('NavItemLink')).to.have.props({ icon: 'keyboard-arrow-right' });
      expect(wrapper.find('NavItemLink')).to.have.props({ iconClassName: 'nav-item-link--icon' });
      expect(wrapper.find('NavItemLink').find('.internal-reference-number--value')).to.have.text('IrnName');
      expect(wrapper.find('NavItemLink').find('.no-irn-selected')).to.not.exist;
    });
  });

  context('when selecting IRN', () => {
    it('should show selected IRN value if any', () => {
      expect(wrapper.find('.internal-reference-number--value')).to.have.text('Select (optional)');
      wrapper = createComponent({ irnRequired: true, alternateIrnAllowed: true }, { selectedIrn: 'SelectedIrnName' });
      expect(wrapper.find('.internal-reference-number--value')).to.have.text('SelectedIrnName');
    });
  });

  function createComponent(irnInfo = defaultIrnInfo, props = {}) {
    const mockedFormWrapper = mount(
      <MockedForm initialFormData={{}} onSubmit={() => {}}>
        <InternalReferenceNumberField
          irnInfo={irnInfo || defaultIrnInfo}
          clickIrnFn={() => {}}
          name="internalReferenceNumber"
          {...props}
        />
      </MockedForm>
    );

    return mockedFormWrapper.find('InternalReferenceNumberField');
  }
});
