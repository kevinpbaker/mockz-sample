import { percent, Responsive } from 'gesso-core';

import { AppShell } from '../../components/AppShell';
import { InboxList } from '../../components/InboxList';

/** A direction for the inbox: one line a conversation, for a team that reads many at a time. */
export function Inbox() {
  return (
    <AppShell current="inbox">
      {Responsive({ at: [768], as: 'row', width: percent(100), height: percent(100) }, size =>
        size.width >= 768
          ? [
              <column key="list" flex={1} maxWidth={960}>
                <InboxList compact={true} />
              </column>
            ]
          : [<InboxList key="list" />]
      )}
    </AppShell>
  );
}
