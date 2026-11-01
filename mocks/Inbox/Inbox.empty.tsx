import { percent } from 'gesso-core';

import { AppShell } from '../../components/AppShell';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { SearchField } from '../../components/SearchField';

const NEW = new URL('../../assets/icons/mail.svg', import.meta.url).href;
const DONE = new URL('../../assets/icons/circle-check.svg', import.meta.url).href;

/** The inbox when every conversation is resolved. */
export function Inbox() {
  return (
    <AppShell current="inbox" counts={{ inbox: 0, assigned: 0, waiting: 0, orders: 0, classes: 0, wholesale: 0 }}>
      <column width={percent(100)} height={percent(100)}>
        <column gap={16} paddingX={16} paddingTop={24} paddingBottom={8} maxWidth={720}>
          <PageHeader title="Inbox" subtitle="No open conversations" action={<Button label="New" icon={NEW} size="small" />} />
          <SearchField placeholder="Search conversations" />
        </column>
        <EmptyState icon={DONE} title="You are all caught up" body="Every customer has an answer. New conversations show here.">
          <Button label="See resolved" variant="secondary" size="small" />
        </EmptyState>
      </column>
    </AppShell>
  );
}
