import { percent, Responsive } from 'gesso-core';
import { Tour, tourTarget } from 'gesso-components';

import { AppShell } from '../../components/AppShell';
import { EmptyState } from '../../components/EmptyState';
import { InboxList } from '../../components/InboxList';

const INBOX = new URL('../../assets/icons/inbox.svg', import.meta.url).href;

/** The inbox the first time a new teammate opens it: a short tour of where things are. */
export function Inbox() {
  const places = tourTarget();
  const list = tourTarget();
  return (
    <box width={percent(100)} height={percent(100)}>
      <AppShell current="inbox" navRef={places.ref}>
        {Responsive({ at: [1024], as: 'row', width: percent(100), height: percent(100) }, size =>
          size.width >= 1024
            ? [
                <column key="list" ref={list.ref} width={400} flexShrink={0}>
                  <InboxList />
                </column>,
                <box key="rule" width={1} height={percent(100)} backgroundColor="border" />,
                <column key="open" flex={1} backgroundColor="surface">
                  <EmptyState icon={INBOX} title="Open a conversation" body="Pick one from the list to read it and reply." />
                </column>
              ]
            : [
                <column key="list" ref={list.ref} flex={1} minHeight={0}>
                  <InboxList />
                </column>
              ]
        )}
      </AppShell>
      <Tour
        doneLabel="Start"
        steps={[
          { title: 'Welcome to Harbor', body: 'This is where the Juniper Ceramics team answers customers. It takes a minute to see where things are.' },
          { target: places, title: 'Your places', body: 'Inbox has every conversation. Assigned to me and Waiting show the ones that need you.', side: 'end' },
          { target: list, title: 'Newest first', body: 'A dot shows a conversation nobody has read. Open one to read it and reply.', side: 'end' },
          { title: 'You are ready', body: 'Reply to Maya first: her mug arrived chipped.' }
        ]}
      />
    </box>
  );
}
