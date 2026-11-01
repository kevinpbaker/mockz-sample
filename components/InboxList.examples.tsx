import * as C from './InboxList';

export const InboxList = {
  Default: <C.InboxList />,
  OneOpen: <C.InboxList selected="Maya Ferreira" />,
  OneResolved: <C.InboxList resolved="Maya Ferreira" />,
  Compact: <C.InboxList compact={true} />
};
