import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import EnrollSecurityQuestionList from 'src/enroll/components/enrollSecurityQuestionList';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';

describe('EnrollSecurityQuestionList', () => {
  beforeEach(() => {
    mockErrorHeaderContainerWithJest(jest);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should display title', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-header').textContent).toBe('Security Info');
    });

    it('should display all questions when none are excluded', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.question-list-item-container')).toMatchSnapshot();
    });

    it('should not display excluded question', () => {
      const { container } = createComponent({ excludeFieldValue: questions[0] });

      expect(container.querySelectorAll('.question-list-item-container')).toMatchSnapshot();
    });

    it('should display check mark for selected question', () => {
      const { container } = createComponent({ selectedSecurityQuestion: questions[0] });

      expect(container.querySelectorAll('.question-list-item-container')).toMatchSnapshot();
    });
  });

  describe('onSelectedQuestion', () => {
    it('should call cancel when cancel button clicked', () => {
      const onSelectedQuestionStub = jest.fn();

      const { container } = createComponent({ onSelectedQuestion: onSelectedQuestionStub });

      const question = container.querySelectorAll('.question-list-item-container')[0];

      fireEvent.click(question);

      expect(onSelectedQuestionStub).toHaveBeenCalled();
    });
  });

  const questions = new EnrollSecurityQuestionsBuilder().build();

  const securityQuestions = _.map(questions, (value) => ({
    label: `${value}`,
    value
  }));

  const createComponent = (props = {}) => {
    const defaultProps = { securityQuestions };
    const mockStore = createMockedFormStore();

    return render(
      <Provider store={mockStore}>
        <EnrollSecurityQuestionList {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
