import React from 'react';
import { mount } from 'enzyme';
import ShareItineraryEmailFields from 'src/shared/form/fields/shareItineraryEmailFields';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('ShareItineraryEmailFields', () => {
  it("should not be displayed if the form model doesn't have shareItineraryEmail field", () => {
    const component = createComponent();

    expect(component.find('.share-itinerary-email')).not.to.be.present();
  });

  context('Share Itinerary email link', () => {
    it("should be displayed when we haven't inputted share itinerary email", () => {
      const component = createComponent();

      expect(component.find('.link-toggler')).to.be.present();
    });

    it('should not be displayed when we have inputted share itinerary email', () => {
      const component = createComponent({}, '123@q.com');

      expect(component.find('.link-toggler')).not.to.be.present();
    });

    it('should not be displayed when the user clicks on the link', () => {
      const component = createComponent();

      component.find('.link-toggler').simulate('click');

      expect(component.find('.link-toggler')).not.to.be.present();
    });
  });

  context('Share Itinerary input field', () => {
    it("should not be displayed when we haven't inputted share itinerary email", () => {
      const component = createComponent();

      expect(component.find('.form-fields--receipt-email')).not.to.be.present();
    });

    it('should be displayed when we have inputted share itinerary email', () => {
      const component = createComponent({}, 'some@email.com');

      expect(component.find('.form-fields--receipt-email')).to.be.present();
    });

    it('should be displayed when the user clicks on the link', () => {
      const component = createComponent();

      component.find('.link-toggler').simulate('click');

      expect(component.find('.form-fields--receipt-email')).to.be.present();
    });
  });

  context('Itineraries message', () => {
    it("should not be displayed when we haven't inputted share itinerary email", () => {
      const component = createComponent({});

      expect(component.find('[data-qa="itineraries-message"]')).not.to.be.present();
    });

    it('should be displayed when we have inputted share itinerary email', () => {
      const component = createComponent({}, 'some@email.com');

      expect(component.find('[data-qa="itineraries-message"]')).to.be.present();
    });

    it('should be displayed when the user clicks on the link', () => {
      const component = createComponent();

      component.find('.link-toggler').simulate('click');

      expect(component.find('[data-qa="itineraries-message"]')).to.be.present();
    });
  });

  function createComponent(props = {}, initialValue = '', formOptions = {}) {
    const onSubmitStub = () => null;
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={{ shareItineraryEmail: initialValue }} onSubmit={onSubmitStub}>
        <ShareItineraryEmailFields names={['shareItineraryEmail']} {...props} />
      </MockedForm>
    );
  }
});
