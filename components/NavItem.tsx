import { map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent } from 'gesso-core';
import { themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';
import { Icon } from './Icon';

/** A tint under the pointer, a deeper one while pressed. Made once and shared. */
const PRESS = interactive({
  hover: true,
  press: true,
  hovered: { backgroundColor: 'controlBackgroundHovered' },
  pressed: { backgroundColor: 'controlBackgroundPressed' }
});
const RING = focusRing();

/**
 * A place in the app: an icon, its name, and how many conversations
 * wait there. In the sidebar it is a row; in a phone's tab bar the icon
 * sits over a short name. `selected` is where the person is now.
 */
export function NavItem(
  inputs: Inputs<{ label: string; icon: string; count?: number; selected?: boolean; placement?: 'sidebar' | 'tabBar'; onPress?: () => void }>
): UiChild {
  const sizes = themeTokenCell(controlSizes);
  const selected = inputs.selected.pipe(map(selected => selected === true));
  const ink = selected.pipe(map(on => (on ? 'selectionForeground' : 'textMuted')));
  const press = () => inputs.onPress.emit();
  const pressing = {
    role: 'link' as const,
    label: inputs.label,
    focusable: true,
    modifiers: [sizes.modifier, PRESS, RING],
    states: selected.pipe(map(on => (on ? ['selected' as const] : []))),
    onClick: press,
    onKeyDown: (event: UiKeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        press();
        event.preventDefault();
      }
    }
  };
  return inputs.placement.pipe(
    map(placement =>
      placement === 'tabBar' ? (
        <column {...pressing} flex={1} gap={4} x="center" y="center" paddingY={8} borderRadius="medium" color={selected.pipe(map(on => (on ? 'primary' : 'textMuted')))}>
          <Icon src={inputs.icon} size={20} />
          <text text={inputs.label} textStyle="label" color={selected.pipe(map(on => (on ? 'primary' : 'textMuted')))} textWrap="none" />
        </column>
      ) : (
        <row
          {...pressing}
          gap={8}
          y="center"
          height={sizes.select(tokens => tokens.navItem)}
          paddingX={8}
          borderRadius="small"
          color={ink}
          backgroundColor={selected.pipe(map(on => (on ? 'selectionBackground' : undefined)))}>
          <Icon src={inputs.icon} />
          <text
            text={inputs.label}
            textStyle={selected.pipe(map(on => (on ? 'bodyStrong' : 'body')))}
            color={selected.pipe(map(on => (on ? 'selectionForeground' : 'text')))}
            flex={1}
            minWidth={0}
            maxLines={1}
            textOverflow="ellipsis"
          />
          <text text={inputs.count.pipe(map(count => (count === undefined ? '' : String(count))))} textStyle="label" color={ink} />
        </row>
      )
    )
  );
}
