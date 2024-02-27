import { storiesOf } from '@storybook/react';
import React from 'react';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';

const props = new BriefBoundBuilder().build();
const withOvernightStopsProps = new BriefBoundBuilder().withOvernightStops();
const withOvernightUnderDepartureProps = new BriefBoundBuilder().withOvernightUnderDeparture();

storiesOf('components/briefBound', module).add('default', () => <BriefBound {...props} />)
.add('with overnight stops', () => <BriefBound {...withOvernightStopsProps} />)
.add('with overnight under departure', () => <BriefBound {...withOvernightUnderDepartureProps} />);
