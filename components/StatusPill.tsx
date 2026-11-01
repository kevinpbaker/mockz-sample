import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/** A word on a coloured ground, for the state of a record: new, read, or needing a reply. */
export function StatusPill(inputs: Inputs<{ label: string; tone?: 'quiet' | 'loud' }>): UiChild {
  const loud = inputs.tone.value === 'loud';
  return (
    <box paddingX={8} paddingY={2} borderRadius="full" backgroundColor={loud ? 'primary' : 'surface'}>
      <text text={inputs.label} textStyle="label" color={loud ? 'background' : 'textMuted'} />
    </box>
  );
}
