import React from 'react';
import { storiesOf } from '@storybook/react';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';

import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import List from 'src/shared/components/list';
import ListItem from 'src/shared/components/listItem';
import Container from 'src/shared/components/container';
import LabelContainer from 'src/shared/components/labelContainer';

storiesOf('components/myAccountPanel', module).add('default', () => {
  return (
    <Container autoFill>
      <MyAccountPanel heading="Trips">
        <Segments>
          <Segment inverted
                     image='/content/mkt/images/landing_pages/placeholders/sunrise.png'
                     verticalFill>
            <List divided>
              <ListItem>
                <MyAccountNavItem>
                  <LabelContainer labelText="Up Next">
                    <div>May 19-21</div>
                    <div>Chicago</div>
                  </LabelContainer>

                  <p></p>

                  <p></p>
                </MyAccountNavItem>
              </ListItem>
              <ListItem>
                <MyAccountNavItem>4 Upcoming Trips</MyAccountNavItem>
              </ListItem>
            </List>
          </Segment>
          <Segment verticalFill>
            <List divided horizontal fluid>
              <ListItem>
                <MyAccountNavItem>Past Flights</MyAccountNavItem>
              </ListItem>
              <ListItem>
                <MyAccountNavItem>Saved</MyAccountNavItem>
              </ListItem>
            </List>
          </Segment>
        </Segments>
      </MyAccountPanel>
    </Container>
  );
});
