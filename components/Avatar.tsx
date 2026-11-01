import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

const SIZES = { small: 24, medium: 36, large: 48 } as const;

/**
 * A person, as their initials in a circle: a customer in pine, a
 * teammate in neutral. `size` is small (24), medium (36) or large (48).
 */
export function Avatar(inputs: Inputs<{ name: string; tone?: 'customer' | 'team'; size?: 'small' | 'medium' | 'large' }>): UiChild {
  const side = inputs.size.pipe(map(size => SIZES[size ?? 'medium']));
  const team = inputs.tone.pipe(map(tone => tone === 'team'));
  return (
    <box
      width={side}
      height={side}
      flexShrink={0}
      borderRadius="full"
      x="center"
      y="center"
      backgroundColor={team.pipe(map(isTeam => (isTeam ? 'placeholder' : 'selectionBackground')))}>
      <text
        text={inputs.name.pipe(map(initials))}
        textStyle={inputs.size.pipe(map(size => (size === 'small' ? 'overline' : size === 'large' ? 'title' : 'label')))}
        color={team.pipe(map(isTeam => (isTeam ? 'textMuted' : 'selectionForeground')))}
      />
    </box>
  );
}

/** "Maya Ferreira" is MF; one name is its first letter. */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  return words.length === 1 ? words[0]!.slice(0, 1).toUpperCase() : `${words[0]![0]}${words[words.length - 1]![0]}`.toUpperCase();
}
