import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

import { Icon } from './Icon';

/**
 * What a list shows when it has nothing in it: an icon, a line that
 * says why, a line on what to do, and an action under them.
 */
export function EmptyState(inputs: Inputs<{ icon: string; title: string; body: string; children?: UiChild }>): UiChild {
  return (
    <column gap={16} x="center" y="center" padding={32} flex={1}>
      <box width={56} height={56} borderRadius="full" x="center" y="center" backgroundColor="selectionBackground" color="primary">
        <Icon src={inputs.icon} size={20} />
      </box>
      <column gap={8} x="center" maxWidth={320}>
        <text text={inputs.title} textStyle="headline" textAlign="center" />
        <text text={inputs.body} textStyle="body" color="textMuted" textAlign="center" />
      </column>
      {inputs.children.pipe(map(child => child ?? []))}
    </column>
  );
}
