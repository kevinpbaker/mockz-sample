import { percent } from 'gesso-core';
import { ScrollArea } from 'gesso-components';
import { bind, sharedValue, type ComponentContext } from 'gesso-framework';

import { AppShell } from '../../components/AppShell';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { TextField } from '../../components/TextField';

const BACK = new URL('../../assets/icons/arrow-left.svg', import.meta.url).href;
const SEND = new URL('../../assets/icons/send-horizontal.svg', import.meta.url).href;

/**
 * A new conversation, started by the team: who it goes to, about what,
 * and the message. What is typed in To is the flow's `to`, which the
 * flow checks before it goes on.
 */
export function Compose(_inputs: unknown, ctx: ComponentContext) {
  const to = sharedValue(ctx, 'to', '');
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
            <TextField label="To" placeholder="name@example.com" {...bind(to)} />
            <TextField label="Subject" placeholder="What it is about" />
            <TextField label="Message" placeholder="Write your message" multiline={true} />
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
