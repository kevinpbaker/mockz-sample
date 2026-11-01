import { map } from 'rxjs';

import { percent, Responsive } from 'gesso-core';
import { sharedValue, type ComponentContext } from 'gesso-framework';

import { AppShell } from '../../components/AppShell';
import { EmptyState } from '../../components/EmptyState';
import { InboxList } from '../../components/InboxList';

const INBOX = new URL('../../assets/icons/inbox.svg', import.meta.url).href;
const DONE = new URL('../../assets/icons/circle-check.svg', import.meta.url).href;

/** Each open conversation's view, and whether it waits on the customer: what resolving it takes off the sidebar's counts. */
const OPEN: Record<string, { readonly view: 'orders' | 'classes' | 'wholesale'; readonly waiting?: boolean }> = {
  'Maya Ferreira': { view: 'orders' },
  'Theo Lindqvist': { view: 'classes' },
  'Priya Raman': { view: 'wholesale' },
  'Jonah Adeyemi': { view: 'orders', waiting: true }
};
const COUNTS = { inbox: 4, waiting: 1, orders: 2, classes: 1, wholesale: 1 };

/**
 * The team's inbox: every conversation, newest first. On a desktop, room
 * beside it for the one that is opened. The flow's `resolved` is the
 * customer whose conversation was just resolved (Resolve a
 * conversation): it shows resolved in the list and the counts, and on a
 * desktop the room beside it says so.
 */
export function Inbox(_inputs: unknown, ctx: ComponentContext) {
  const resolved = sharedValue(ctx, 'resolved', '');
  const counts = resolved.pipe(
    map(name => {
      const was = OPEN[name];
      return was === undefined
        ? COUNTS
        : { ...COUNTS, inbox: COUNTS.inbox - 1, [was.view]: COUNTS[was.view] - 1, waiting: COUNTS.waiting - (was.waiting === true ? 1 : 0) };
    })
  );
  const beside = resolved.pipe(
    map(name =>
      name === ''
        ? [<EmptyState key="none" icon={INBOX} title="Open a conversation" body="Pick one from the list to read it and reply." />]
        : [<EmptyState key="done" icon={DONE} title="Conversation resolved" body={`${name.split(' ')[0]} gets an email that says it is resolved. If ${name.split(' ')[0]} replies, it opens again.`} />]
    )
  );
  return (
    <AppShell current="inbox" counts={counts}>
      {Responsive({ at: [1024], as: 'row', width: percent(100), height: percent(100) }, size =>
        size.width >= 1024
          ? [
              <column key="list" width={400} flexShrink={0}>
                <InboxList resolved={resolved} />
              </column>,
              <box key="rule" width={1} height={percent(100)} backgroundColor="border" />,
              <column key="open" flex={1} backgroundColor="surface">
                {beside}
              </column>
            ]
          : [<InboxList key="list" resolved={resolved} />]
      )}
    </AppShell>
  );
}
