import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/** The top of a screen: its title, a line under it, and room for an action at the end. */
export function PageHeader(inputs: Inputs<{ title: string; subtitle?: string; action?: UiChild }>): UiChild {
  return (
    <row gap={16} y="center" paddingY={20}>
      <column gap={4} flex={1}>
        <text text={inputs.title} textStyle="headline" />
        <text text={inputs.subtitle} textStyle="body" color="textMuted" visible={inputs.subtitle.value !== undefined} />
      </column>
      {inputs.action.value ?? []}
    </row>
  );
}
