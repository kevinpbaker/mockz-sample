import { percent, Responsive } from 'gesso-core';
import { ScrollArea } from 'gesso-components';
import { sharedValue, type ComponentContext } from 'gesso-framework';

import { AppShell } from '../../components/AppShell';
import { AssignMenu } from '../../components/AssignMenu';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { InboxList } from '../../components/InboxList';
import { Message } from '../../components/Message';
import { ReplyBox } from '../../components/ReplyBox';
import { ResolveButton } from '../../components/ResolveButton';
import { StatusPill } from '../../components/StatusPill';

const BACK = new URL('../../assets/icons/arrow-left.svg', import.meta.url).href;
const ORDER = new URL('../../assets/icons/package.svg', import.meta.url).href;
const SENT = new URL('../../assets/icons/circle-check.svg', import.meta.url).href;

/** The conversation after Send: the reply that was typed is in the thread, and it waits on Maya now. */
export function Conversation(_inputs: unknown, ctx: ComponentContext) {
  const reply = sharedValue(ctx, 'reply', 'Sorry about that, Maya! A new speckled mug ships today. You do not need to send the chipped one back.');
  const thread = (withBack: boolean) => (
    <column flex={1} minWidth={0} height={percent(100)}>
      <row gap={12} y="center" paddingX={16} paddingY={16}>
        {withBack ? [<Button key="back" label="Back to inbox" icon={BACK} iconOnly={true} variant="quiet" />] : []}
        <column gap={2} flex={1} minWidth={0}>
          <text text="Order #4821 arrived with a chipped rim" textStyle="title" maxLines={2} textOverflow="ellipsis" />
          <text text="Maya Ferreira · maya.ferreira@example.com" textStyle="bodySmall" color="textMuted" maxLines={1} textOverflow="ellipsis" />
        </column>
        <ResolveButton customer="Maya Ferreira" iconOnly={withBack} />
      </row>
      <row gap={8} y="center" paddingX={16} paddingBottom={12}>
        <AssignMenu defaultValue="Sam Okoro" />
        <StatusPill status="waiting" />
      </row>
      <box height={1} backgroundColor="border" />
      <ScrollArea flex={1} minHeight={0} padding={16} scrollY={400}>
        <column gap={24} maxWidth={720}>
          <row gap={12} y="center" padding={12} borderRadius="medium" borderWidth={1} borderColor="border" backgroundColor="surface">
            <box width={36} height={36} borderRadius="small" x="center" y="center" backgroundColor="background" color="textMuted">
              <Icon src={ORDER} />
            </box>
            <column gap={2} flex={1} minWidth={0}>
              <text text="Order #4821 · $102.00" textStyle="bodyStrong" />
              <text text="2 speckled mugs, 1 Fog bowl" textStyle="bodySmall" color="textMuted" maxLines={1} textOverflow="ellipsis" />
            </column>
            <text text="Delivered Oct 30" textStyle="label" color="textMuted" textWrap="none" />
          </row>
          <text text="Today" textStyle="overline" color="textMuted" selfX="center" />
          <Message
            author="Maya Ferreira"
            time="9:41 AM"
            body="Hi! My order came today. The speckled mug has a small chip on the rim. The rest of the set is perfect. Can you send a new mug? I attached a photo."
            attachment="chip-on-rim.jpg · 1.2 MB"
          />
          <Message author="Lena Park" time="9:55 AM" from="note" body="We have 6 speckled mugs in stock. Send one today. She does not need to return the chipped one." />
          <Message author="Sam Okoro" time="Just now" from="team" body={reply} />
        </column>
      </ScrollArea>
      <column gap={8} paddingX={16} paddingBottom={16} maxWidth={752}>
        <row gap={8} y="center" color="primary">
          <Icon src={SENT} />
          <text text="Sent. Maya gets your reply by email." textStyle="bodySmall" color="textMuted" />
        </row>
        <ReplyBox placeholder="Write a reply to Maya" />
      </column>
    </column>
  );
  return (
    <AppShell current="inbox">
      {Responsive({ at: [1024], as: 'row', width: percent(100), height: percent(100) }, size =>
        size.width >= 1024
          ? [
              <column key="list" width={400} flexShrink={0}>
                <InboxList selected="Maya Ferreira" />
              </column>,
              <box key="rule" width={1} height={percent(100)} backgroundColor="border" />,
              <column key="thread" flex={1} minWidth={0}>
                {thread(false)}
              </column>
            ]
          : [<column key="thread" flex={1} minWidth={0}>{thread(true)}</column>]
      )}
    </AppShell>
  );
}
