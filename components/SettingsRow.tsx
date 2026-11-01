import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/** One setting: what it is, a line on what it does, and its control at the end. */
export function SettingsRow(inputs: Inputs<{ label: string; description?: string; children?: UiChild }>): UiChild {
  return (
    <row gap={16} y="center" paddingY={14} borderColor="border">
      <column gap={2} flex={1}>
        <text text={inputs.label} textStyle="bodyLarge" />
        <text text={inputs.description} textStyle="bodySmall" color="textMuted" visible={inputs.description.value !== undefined} />
      </column>
      {inputs.children.value ?? []}
    </row>
  );
}
