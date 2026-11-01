import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/** Each status's words and colors. */
const STATUSES = {
  new: { label: 'New', fill: 'primary', ink: 'background', dot: 'background' },
  open: { label: 'Open', fill: 'selectionBackground', ink: 'selectionForeground', dot: 'primary' },
  waiting: { label: 'Waiting', fill: 'surface', ink: 'secondary', dot: 'secondary' },
  resolved: { label: 'Resolved', fill: 'surface', ink: 'textMuted', dot: 'controlBorder' }
} as const;

/**
 * Where a conversation is: new, open (someone is on it), waiting (on the
 * customer) or resolved. A dot and a word, on a ground for its status.
 */
export function StatusPill(inputs: Inputs<{ status: 'new' | 'open' | 'waiting' | 'resolved' }>): UiChild {
  const look = inputs.status.pipe(map(status => STATUSES[status]));
  return (
    <row
      gap={4}
      y="center"
      flexShrink={0}
      paddingLeft={8}
      paddingRight={8}
      height={20}
      borderRadius="full"
      borderWidth={look.pipe(map(each => (each.fill === 'surface' ? 1 : 0)))}
      borderColor="border"
      backgroundColor={look.pipe(map(each => each.fill))}>
      <box width={6} height={6} borderRadius="full" backgroundColor={look.pipe(map(each => each.dot))} />
      <text text={look.pipe(map(each => each.label))} textStyle="label" color={look.pipe(map(each => each.ink))} textWrap="none" />
    </row>
  );
}
