import { combineLatest, map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent } from 'gesso-core';
import { themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';
import { Icon } from './Icon';

/** A filled button: a little lighter under the pointer, lighter still while pressed. Made once and shared. */
const FILLED = interactive({ hover: true, press: true, hovered: { opacity: 0.88 }, pressed: { opacity: 0.74 } });
/** A button with no fill of its own takes one under the pointer instead. */
const UNFILLED = interactive({
  hover: true,
  press: true,
  hovered: { backgroundColor: 'controlBackgroundHovered' },
  pressed: { backgroundColor: 'controlBackgroundPressed' }
});
const RING = focusRing();

/** Each variant's fill, ink, edge and hover. */
const LOOKS = {
  primary: { fill: 'primary', ink: 'background', border: 0, shadow: 'extraSmall', hover: FILLED },
  secondary: { fill: 'controlBackground', ink: 'text', border: 1, shadow: 'extraSmall', hover: UNFILLED },
  quiet: { fill: undefined, ink: 'text', border: 0, shadow: 'none', hover: UNFILLED }
} as const;

/**
 * What a person presses to act. `primary` is the one main action on a
 * screen, `secondary` sits beside it, `quiet` is for a toolbar. An
 * `icon` goes before the label; with `iconOnly` the label is only what
 * a screen reader says. `size` is small or medium, and taller on a
 * touch screen.
 */
export function Button(
  inputs: Inputs<{
    label: string;
    variant?: 'primary' | 'secondary' | 'quiet';
    size?: 'small' | 'medium';
    icon?: string;
    iconOnly?: boolean;
    disabled?: boolean;
    onPress?: () => void;
  }>
): UiChild {
  const sizes = themeTokenCell(controlSizes);
  const size = combineLatest([sizes, inputs.size]).pipe(map(([tokens, size]) => tokens[size ?? 'medium']));
  const iconOnly = inputs.iconOnly.pipe(map(only => only === true));
  const press = () => inputs.onPress.emit();
  return inputs.variant.pipe(
    map(variant => {
      const look = LOOKS[variant ?? 'primary'];
      return (
        <row
          role="button"
          label={inputs.label}
          focusable={true}
          disabled={inputs.disabled}
          modifiers={[sizes.modifier, look.hover, RING]}
          // The hover and press above ease in and out rather than snap.
          transition={{ opacity: 'press' }}
          onClick={press}
          onKeyDown={(event: UiKeyboardEvent) => {
            if (event.key === ' ' || event.key === 'Enter') {
              press();
              event.preventDefault();
            }
          }}
          height={size.pipe(map(tokens => tokens.height))}
          minWidth={size.pipe(map(tokens => tokens.height))}
          paddingX={combineLatest([size, iconOnly]).pipe(map(([tokens, only]) => (only ? 0 : tokens.paddingX)))}
          gap={8}
          x="center"
          y="center"
          flexShrink={0}
          borderRadius="medium"
          borderWidth={look.border}
          borderColor="controlBorder"
          backgroundColor={look.fill}
          color={look.ink}
          boxShadows={look.shadow}
          opacity={inputs.disabled.pipe(map(disabled => (disabled === true ? 0.45 : 1)))}>
          {inputs.icon.pipe(map(icon => (icon === undefined ? [] : [<Icon key="icon" src={icon} />])))}
          {iconOnly.pipe(map(only => (only ? [] : [<text key="label" text={inputs.label} textStyle="bodyStrong" color={look.ink} textWrap="none" />])))}
        </row>
      );
    })
  );
}
