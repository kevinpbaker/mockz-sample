import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/** One setting: what it is, a line on what it does, and its control at the end. */
export function SettingsRow(inputs: Inputs<{ label: string; description?: string; children?: UiChild }>): UiChild {
  return (
    <row gap={16} y="center" paddingX={16} paddingY={12}>
      <column gap={2} flex={1} minWidth={0}>
        <text text={inputs.label} textStyle="bodyStrong" />
        {inputs.description.pipe(
          map(description => (description === undefined ? [] : [<text key="description" text={description} textStyle="bodySmall" color="textMuted" />]))
        )}
      </column>
      {inputs.children.pipe(map(child => child ?? []))}
    </row>
  );
}
