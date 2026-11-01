import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

/**
 * A group of related things on a raised card: a title and a line on
 * what the group is for, over its content. Put several rows in one
 * `<column>`, a `<box height={1} backgroundColor="border" />` between.
 */
export function Card(inputs: Inputs<{ title?: string; description?: string; children?: UiChild }>): UiChild {
  return (
    <column borderRadius="large" borderWidth={1} borderColor="border" backgroundColor="background" boxShadows="extraSmall" overflow="hidden">
      {inputs.title.pipe(
        map(title =>
          title === undefined
            ? []
            : [
                <column key="heading" gap={2} paddingX={16} paddingTop={16} paddingBottom={4}>
                  <text text={title} textStyle="title" />
                  {inputs.description.pipe(
                    map(description => (description === undefined ? [] : [<text key="description" text={description} textStyle="bodySmall" color="textMuted" />]))
                  )}
                </column>
              ]
        )
      )}
      {inputs.children.pipe(map(child => child ?? []))}
    </column>
  );
}
