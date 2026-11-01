import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import { Image } from 'gesso-components';
import type { Inputs } from 'gesso-framework';

/**
 * One of the project's icons (assets/icons), 16 or 20 across. It is
 * drawn in the color of the text around it: set `color` on what holds
 * it.
 */
export function Icon(inputs: Inputs<{ src: string; size?: 16 | 20 }>): UiChild {
  const side = inputs.size.pipe(map(size => size ?? 16));
  return <Image src={inputs.src} width={side} height={side} flexShrink={0} />;
}
