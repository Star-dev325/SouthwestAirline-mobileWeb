// @flow
import React from 'react';
import _ from 'lodash';
import Fields from 'src/shared/components/fields';
import withFields from 'src/shared/form/enhancers/withFields';
import FormInputField from 'src/shared/form/fields/formInputField';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formData: FormData
};

type State = {
  expanded: boolean
};

class ShareItineraryEmailFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      formData: { shareItineraryEmail }
    } = this.props;

    this.state = {
      expanded: !_.isEmpty(shareItineraryEmail)
    };
  }

  _expandShareItinerary = () => {
    this.setState({ expanded: true });
  };

  render() {
    const { expanded } = this.state;

    return (
      <div data-qa="share-itinerary-email">
        {expanded ? (
          <div>
            <Fields type="grouped" label={i18n('SHARED__SHARE_ITINERARY_WITH')} className="form-fields--receipt-email">
              <FormInputField
                name="shareItineraryEmail"
                placeholder="Email address (optional)"
                {..._.omit(this.props, 'formData')}
              />
            </Fields>
            <div data-qa="itineraries-message" className="py4 gray5 medium">
              {i18n('SHARED__SHARE_ITINERARY__ITINERARIES_MESSAGE')}
            </div>
          </div>
        ) : (
          <div className="link-toggler" onClick={this._expandShareItinerary}>
            {i18n('SHARED__SHARE_ITINERARY')}
          </div>
        )}
      </div>
    );
  }
}

export default withFields(ShareItineraryEmailFields);
