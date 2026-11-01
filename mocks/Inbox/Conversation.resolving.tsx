import { StartingInputs } from 'gesso-framework';

import { Conversation as AsWritten } from './Conversation';

/** The conversation as Mark resolved asks to make sure: a moment of the screen, not a copy of it. */
export function Conversation() {
  return (
    <StartingInputs of={{ ResolveButton: { open: true } }}>
      <AsWritten />
    </StartingInputs>
  );
}
