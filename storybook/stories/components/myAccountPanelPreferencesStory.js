import React from 'react';
import { storiesOf } from '@storybook/react';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';

import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import List from 'src/shared/components/list';
import ListItem from 'src/shared/components/listItem';
import Container from 'src/shared/components/container';
import LabelContainer from 'src/shared/components/labelContainer';

storiesOf('components/myAccountPanelPreferences', module).add('default', () => {
  return (
    <Container autoFill>
      <MyAccountPanel heading="Preferences">
        <Segments>
          <Segment verticalFill>
            <List divided>
              <ListItem>
                <Segment horizontalFill>
                  <LabelContainer labelText="Contact information">
                    <div>adfa@gmail.com</div>
                    <div>(800) 555-5555</div>
                  </LabelContainer>
                </Segment>
              </ListItem>
              <ListItem>
                <Segment horizontalFill>
                  <LabelContainer labelText="Payment information">You have no saved payment information</LabelContainer>
                </Segment>
              </ListItem>
            </List>
          </Segment>
          <Segment>Edit your preferences on our destop site or call 1 (800) 555-5555.</Segment>
        </Segments>
      </MyAccountPanel>
    </Container>
  );
});
