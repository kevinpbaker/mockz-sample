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
  }
];
