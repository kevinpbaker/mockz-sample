import { percent } from 'gesso-core';
import { ScrollArea } from 'gesso-components';
import { bind, sharedValue, type ComponentContext } from 'gesso-framework';

import { AppShell } from '../../components/AppShell';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { TextField } from '../../components/TextField';

const BACK = new URL('../../assets/icons/arrow-left.svg', import.meta.url).href;
const SEND = new URL('../../assets/icons/send-horizontal.svg', import.meta.url).href;

/** A new conversation sent to something that is not an email address: To says what is wrong. */
export function Compose(_inputs: unknown, ctx: ComponentContext) {
  const to = sharedValue(ctx, 'to', 'theo.lindqvist');
  return (
    <AppShell current="inbox">
      <ScrollArea width={percent(100)} flex={1} minHeight={0} padding={16}>
        <column width={percent(100)} maxWidth={640} gap={24} paddingTop={8} selfX="center">
          <PageHeader
            title="New conversation"
            subtitle="The customer gets it by email."
            leading={<Button label="Back to inbox" icon={BACK} iconOnly={true} variant="quiet" />}
          />
          <column gap={16}>
            <TextField label="To" placeholder="name@example.com" error="Enter an email address, such as name@example.com." {...bind(to)} />
            <TextField label="Subject" placeholder="What it is about" defaultValue="Your class on the 14th" />
            <TextField
              label="Message"
              placeholder="Write your message"
              multiline={true}
              defaultValue="Hi Theo, there is space in the 14:00 wheel class on the 14th. I moved you there. See you Saturday!"
            />
          </column>
          <row gap={8} x="end">
            <Button label="Cancel" variant="secondary" />
            <Button label="Send" icon={SEND} />
          </row>
        </column>
      </ScrollArea>
    </AppShell>
  );
}
