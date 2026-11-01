import { percent, Responsive } from 'gesso-core';

import { AppShell } from '../../components/AppShell';
import { EmptyState } from '../../components/EmptyState';
import { InboxList } from '../../components/InboxList';

const INBOX = new URL('../../assets/icons/inbox.svg', import.meta.url).href;

/** The team's inbox: every conversation, newest first. On a desktop, room beside it for the one that is opened. */
export function Inbox() {
  return (
    <AppShell current="inbox">
      {Responsive({ at: [1024], as: 'row', width: percent(100), height: percent(100) }, size =>
        size.width >= 1024
          ? [
              <column key="list" width={400} flexShrink={0}>
                <InboxList />
              </column>,
              <box key="rule" width={1} height={percent(100)} backgroundColor="border" />,
              <column key="open" flex={1} backgroundColor="surface">
                <EmptyState icon={INBOX} title="Open a conversation" body="Pick one from the list to read it and reply." />
              </column>
            ]
          : [<InboxList key="list" />]
      )}
    </AppShell>
  );
}
