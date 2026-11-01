import { percent } from 'gesso-core';

import { PageHeader } from '../components/PageHeader';
import { StatusPill } from '../components/StatusPill';

const MESSAGES = [
  { from: 'Ada Lovelace', subject: 'Notes on the engine', status: 'New', loud: true },
  { from: 'Grace Hopper', subject: 'Compiler review on Thursday', status: 'Reply', loud: true },
  { from: 'Alan Kay', subject: 'Re: the Dynabook sketches', status: 'Read', loud: false },
  { from: 'Margaret Hamilton', subject: 'Launch checklist, final', status: 'Read', loud: false }
];

/** The inbox: who wrote, about what, and what each message is waiting on. */
export function Inbox() {
  return (
    <column width={percent(100)} height={percent(100)} backgroundColor="background" padding={24} gap={8}>
      <PageHeader
        title="Inbox"
        subtitle="4 conversations"
        action={
          <box paddingX={14} paddingY={8} borderRadius="medium" backgroundColor="primary">
            <text text="New message" color="background" textStyle="label" />
          </box>
        }
      />
      {MESSAGES.map(message => (
        <row gap={12} y="center" padding={12} borderRadius="medium" backgroundColor="surface">
          <box width={36} height={36} borderRadius="full" backgroundColor="controlBorder" />
          <column gap={2} flex={1}>
            <text text={message.from} textStyle="bodyLarge" />
            <text text={message.subject} textStyle="bodySmall" color="textMuted" maxLines={1} textOverflow="ellipsis" />
          </column>
          <StatusPill label={message.status} tone={message.loud ? 'loud' : 'quiet'} />
        </row>
      ))}
    </column>
  );
}
