import { map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent } from 'gesso-core';
import { controlled, themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';

/** A little lighter under the pointer, lighter still while pressed. Shared, so it is not attached again on every change. */
const PRESS = interactive({ hover: true, press: true, hovered: { opacity: 0.9 }, pressed: { opacity: 0.75 } });
const RING = focusRing();

/**
 * An on or off switch: a pill with a knob at the end it is set to.
 * `on` is where it starts, and a press or Space turns it; `onChange`
 * hears each turn, and a screen that passes it owns `on`. `label` is
 * what a screen reader calls it; `disabled` fades it and takes no press.
 */
export function Toggle(inputs: Inputs<{ on?: boolean; defaultOn?: boolean; onChange?: (on: boolean) => void; label?: string; disabled?: boolean }>): UiChild {
  const on = controlled({ component: 'Toggle', name: 'on', source: inputs.on, initial: inputs.defaultOn, fallback: false, onChange: inputs.onChange });
  const sizes = themeTokenCell(controlSizes);
  const turn = () => on.change(!on.current());
  return (
    <row
      role="switch"
      label={inputs.label}
      focusable={true}
      disabled={inputs.disabled}
      states={on.value.pipe(map(value => (value ? ['checked' as const] : [])))}
      modifiers={[sizes.modifier, PRESS, RING]}
      // The hover and press above ease in and out rather than snap.
      transition={{ opacity: 'fast' }}
      onClick={turn}
      onKeyDown={(event: UiKeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
          turn();
          event.preventDefault();
        }
      }}
      // As big as a finger needs on a touch screen, around the track it draws.
      minWidth={sizes.select(tokens => tokens.target)}
      height={sizes.select(tokens => tokens.target)}
      x="center"
      y="center"
      flexShrink={0}
      borderRadius="full"
      opacity={inputs.disabled.pipe(map(disabled => (disabled === true ? 0.5 : 1)))}>
      <row
        width={40}
        height={24}
        padding={2}
        borderRadius="full"
        x={on.value.pipe(map(value => (value ? 'end' : 'start')))}
        backgroundColor={on.value.pipe(map(value => (value ? 'primary' : 'controlBorder')))}>
        <box
          width={20}
          height={20}
          borderRadius="full"
          boxShadows="small"
          // Off, the knob is muted, so it shows on the track in light and dark alike.
          backgroundColor={on.value.pipe(map(value => (value ? 'background' : 'textMuted')))}
        />
      </row>
    </row>
  );
}
