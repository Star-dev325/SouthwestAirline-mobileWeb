// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CheckboxButton from 'src/shared/components/checkboxButton';
import * as FeatureToggleActions from 'src/shared/featureToggle/featureToggleActions';

type Props = {
  toggles: *,
  updateToggleFn: (string, boolean) => void
};

export class FeatureTogglePage extends React.Component<Props> {
  render() {
    const { toggles, updateToggleFn } = this.props;
    const buildTime = process.env.BUILD_TIME;

    return (
      <div>
        {_.map(_.keys(toggles), (toggle, index) => (
          <div key={index} className="bgwhite mb2" data-link={toggle}>
            <CheckboxButton
              key={toggle}
              defaultChecked={toggles[toggle]}
              onChange={(value) => {
                updateToggleFn(toggle, value);
              }}
            >
              <span>{toggle}</span>
            </CheckboxButton>
          </div>
        ))}
        <div className="center pdkblue p5 large">{buildTime}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggles: _.get(state, 'app.toggles')
});

const mapDispatchToProps = {
  updateToggleFn: FeatureToggleActions.updateToggle
};

const enhancers = _.flowRight(connect(mapStateToProps, mapDispatchToProps));

export default enhancers(FeatureTogglePage);
