import { StartingInputs } from 'gesso-framework';

import { Conversation as AsWritten } from './Conversation';

/** The conversation with the Assign list open: a moment of the screen, not a copy of it. */
export function Conversation() {
  return (
    <StartingInputs of={{ AssignMenu: { open: true } }}>
      <AsWritten />
    </StartingInputs>
  );
}
