// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import PageHeader from 'src/shared/components/pageHeader';
import ProgressBar from 'src/shared/components/progressBar';

type Props = {
  step: number,
  title: string,
  subTitles: Array<string>,
  totalStep: number,
  currentIconType: string,
  className?: string,
  completedIconType: string
};

class ProgressionBar extends React.Component<Props> {
  static defaultProps = {
    step: 1,
    title: 'Price',
    subTitles: ['Price', 'Passengers', 'Purchase'],
    totalStep: 4,
    currentIconType: 'user',
    completedIconType: 'check'
  };

  _getCurrentProgressPercentage() {
    const { step, totalStep } = this.props;

    return ((step - 1) / (totalStep - 1)) * 100;
  }

  _renderStep() {
    const { totalStep, step, completedIconType, currentIconType } = this.props;

    return _.map(_.range(0, totalStep), (key) => {
      const isCompleted = key < step - 1;
      const isCurrent = key === step - 1;

      return (
        <span
          key={key}
          className={cx({
            'step-item': true,
            'step-item--completed': isCompleted,
            'step-item--current': isCurrent
          })}
          style={{
            left: `${(100 / (totalStep - 1)) * key}%`
          }}
        >
          <span className="step-item--inner">
            {isCompleted ? <Icon type={completedIconType} className="completed-check" /> : null}
            {isCurrent ? <Icon type={currentIconType} /> : null}
          </span>
        </span>
      );
    });
  }

  render() {
    const { className, title, subTitles } = this.props;

    return (
      <PageHeader noPadding>
        <div className={cx(className, 'progression-bar')}>
          <div className="title">{title}</div>
          <div className="progress-step">
            <ProgressBar now={this._getCurrentProgressPercentage()} />
            {this._renderStep()}
          </div>
          <div className="progression-bar--sub-title-flex">
            {_.map(subTitles, (subTitle, index: number) => (
              <div className="progression-bar--sub-title" key={index}>
                {subTitle}
              </div>
            ))}
          </div>
        </div>
      </PageHeader>
    );
  }
}

export default ProgressionBar;
