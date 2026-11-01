import { Compose } from './Compose';
import { Compose as NotAnEmail } from './Compose.error';
import { Compose as ComposeSent } from './Compose.sent';
import { Conversation } from './Conversation';
import { Conversation as Sent } from './Conversation.sent';
import { Inbox } from './Inbox';

export const flows = [
  {
    name: 'Reply to a customer',
    steps: [
      { screen: Inbox, label: 'Order #4821 arrived with a chipped rim' },
      { screen: Conversation, label: 'Send' },
      { screen: Sent }
    ]
  },
  {
    name: 'Start a conversation',
    steps: [
      { screen: Inbox, label: 'New' },
      {
        screen: Compose,
        label: 'Send',
        // What was typed in To decides where Send goes: back with an error, or on.
        branches: [{ name: 'not an email', when: (values: Record<string, unknown>) => !String(values.to ?? '').includes('@'), to: NotAnEmail }]
      },
      { screen: ComposeSent }
    ]
  }
];
