import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/**
 * The top of a screen: its title, a line under it, a back button
 * before it when there is one (`leading`), and room for actions at the
 * end (`action`).
 */
export function PageHeader(inputs: Inputs<{ title: string; subtitle?: string; leading?: UiChild; action?: UiChild }>): UiChild {
  return (
    <row gap={12} y="center" minHeight={40}>
      {inputs.leading.pipe(map(leading => leading ?? []))}
      <column gap={2} flex={1} minWidth={0}>
        <text text={inputs.title} textStyle="headline" maxLines={1} textOverflow="ellipsis" />
        {inputs.subtitle.pipe(
          map(subtitle =>
            subtitle === undefined ? [] : [<text key="subtitle" text={subtitle} textStyle="body" color="textMuted" maxLines={1} textOverflow="ellipsis" />]
          )
        )}
      </column>
      {inputs.action.pipe(map(action => action ?? []))}
    </row>
  );
}
