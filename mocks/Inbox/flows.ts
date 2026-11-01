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
      // Any conversation in the list opens it: the row pressed is what the conversation shows.
      { screen: Inbox, press: 'ConversationRow' },
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
        branches: [{ name: 'not an email', when: { value: 'to', is: 'not an email' }, to: NotAnEmail }]
      },
      { screen: ComposeSent }
    ]
  },
  {
    name: 'Resolve a conversation',
    steps: [
      { screen: Inbox, press: 'ConversationRow' },
      { screen: Conversation, label: 'Mark resolved' },
      // The same screen with its dialog open: a step's inputs, not a state of its own.
      { screen: Conversation, label: 'Resolve', inputs: { ResolveButton: { open: true } } },
      { screen: Inbox }
    ]
  }
];
