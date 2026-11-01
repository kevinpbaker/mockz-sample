import { StartingInputs } from 'gesso-framework';

import { Inbox as OnTour } from './Inbox.tour';

/** The tour at its second step, pointing at the places: a moment of the tour, not a copy of it. */
export function Inbox() {
  return (
    <StartingInputs of={{ Tour: { step: 1 } }}>
      <OnTour />
    </StartingInputs>
  );
}
