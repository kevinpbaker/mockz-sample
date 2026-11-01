import { map } from 'rxjs';

import { percent, type UiChild } from 'gesso-core';
import { ScrollArea } from 'gesso-components';
import type { Inputs } from 'gesso-framework';

import { Button } from './Button';
import { ConversationRow } from './ConversationRow';
import { PageHeader } from './PageHeader';
import { SearchField } from './SearchField';

const NEW = new URL('../assets/icons/mail.svg', import.meta.url).href;

/**
 * The inbox's list: its header, search, and every conversation, newest
 * first. The inbox draws it alone on a phone and a tablet, and beside
 * the open conversation on a desktop. `selected` is the customer whose
 * conversation is open, which shows as read. `compact` draws each
 * conversation on one line.
 */
export function InboxList(inputs: Inputs<{ selected?: string; compact?: boolean }>): UiChild {
  const open = (name: string) => inputs.selected.pipe(map(selected => selected === name));
  return (
    <column width={percent(100)} height={percent(100)}>
      <column gap={16} paddingX={16} paddingTop={24} paddingBottom={8}>
        <PageHeader title="Inbox" subtitle="6 conversations, 4 open" action={<Button label="New" icon={NEW} size="small" />} />
        <SearchField placeholder="Search conversations" />
      </column>
      <ScrollArea width={percent(100)} flex={1} minHeight={0} paddingX={8} paddingY={8}>
        <column gap={2}>
          <ConversationRow
            name="Maya Ferreira"
            subject="Order #4821 arrived with a chipped rim"
            preview="The speckled mug has a small chip on the rim. Can you send a new one?"
            time="9:41 AM"
            status={open('Maya Ferreira').pipe(map(opened => (opened ? ('open' as const) : ('new' as const))))}
            tag="Orders"
            unread={open('Maya Ferreira').pipe(map(opened => !opened))}
            compact={inputs.compact}
            selected={open('Maya Ferreira')}
          />
          <ConversationRow
            name="Theo Lindqvist"
            subject="Move my Saturday wheel class"
            preview="I cannot come to the 10:00 class on the 14th. Is there space at 14:00?"
            time="9:12 AM"
            status="new"
            tag="Classes"
            unread={true}
            compact={inputs.compact}
            selected={open('Theo Lindqvist')}
          />
          <ConversationRow
            name="Priya Raman"
            subject="Wholesale price for 40 bowls"
            preview="We open a café in March and we like your Fog glaze a lot."
            time="Yesterday"
            status="open"
            tag="Wholesale"
            compact={inputs.compact}
            selected={open('Priya Raman')}
          />
          <ConversationRow
            name="Jonah Adeyemi"
            subject="Gift card code does not work"
            preview="Thanks, I will try the new code tonight and tell you."
            time="Yesterday"
            status="waiting"
            tag="Orders"
            compact={inputs.compact}
            selected={open('Jonah Adeyemi')}
          />
          <ConversationRow
            name="Sofia Marchetti"
            subject="Thank you for the glaze workshop"
            preview="We had a great time on Saturday. When is the next one?"
            time="Mon"
            status="resolved"
            tag="Classes"
            compact={inputs.compact}
            selected={open('Sofia Marchetti')}
          />
          <ConversationRow
            name="Kenji Watanabe"
            subject="Do you ship to Canada?"
            preview="Great, I will order the large planter this week."
            time="Oct 28"
            status="resolved"
            tag="Orders"
            compact={inputs.compact}
            selected={open('Kenji Watanabe')}
          />
        </column>
      </ScrollArea>
    </column>
  );
}
