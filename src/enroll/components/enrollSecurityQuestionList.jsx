// @flow

import React from 'react';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import PageHeader from 'src/shared/components/pageHeader';
import Icon from 'src/shared/components/icon';

type QuestionOptionType = {
  label: string,
  value: string
};

type Props = {
  securityQuestions: Array<QuestionOptionType>,
  selectedSecurityQuestion?: string | (() => string),
  excludeFieldValue?: string,
  onSelectedQuestion: ?(?string) => void
};

class EnrollSecurityQuestionList extends React.Component<Props> {
  static defaultProps = {
    onSelectedQuestion: _.noop
  };

  constructor(props: Props) {
    super(props);
  }

  _getNonExcludedSecurityQuestions = (): Array<QuestionOptionType> => {
    const { securityQuestions, excludeFieldValue } = this.props;

    if (excludeFieldValue) {
      return _.reject(securityQuestions, ['value', excludeFieldValue]);
    }

    return securityQuestions;
  };

  _onSelectedQuestion = (idx: number) => {
    const { onSelectedQuestion } = this.props;
    const selectedQuestion = this._getNonExcludedSecurityQuestions()[idx];

    onSelectedQuestion && onSelectedQuestion(selectedQuestion.value);
  };

  _renderSecurityQuestionList = () => {
    const questions = this._getNonExcludedSecurityQuestions();
    const { props } = this;

    const selectedSecurityQuestion =
      typeof props.selectedSecurityQuestion === 'function'
        ? props.selectedSecurityQuestion()
        : props.selectedSecurityQuestion;

    return _.chain(questions)
      .map((question, index) => {
        const isSelected = _.isEqual(selectedSecurityQuestion, question.value);

        return (
          <div
            className="question-list-item-container"
            key={index}
            onClick={this._onSelectedQuestion.bind(null, index)}
          >
            <li>{question.label}</li>
            {isSelected && <Icon type="check" className="sblue regular larger" />}
          </div>
        );
      })
      .compact()
      .value();
  };

  render() {
    return (
      <div className="enroll-security-questions-list">
        <PageHeader className="center xlarge">Security Info</PageHeader>
        <h3>{i18n('ENROLL_PICK_SECURITY_QUESTION')}</h3>
        <div className="question-list">
          <div className="question-list--results options-list--results">
            {<ul className="question-list-group">{this._renderSecurityQuestionList()}</ul>}
          </div>
        </div>
      </div>
    );
  }
}

export default EnrollSecurityQuestionList;
