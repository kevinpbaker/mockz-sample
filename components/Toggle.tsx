import { map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent } from 'gesso-core';
import { controlled, type Inputs } from 'gesso-framework';

/** A little lighter under the pointer, lighter still while pressed. Shared, so it is not attached again on every change. */
const PRESS = interactive({ hover: true, press: true, hovered: { opacity: 0.9 }, pressed: { opacity: 0.75 } });
const RING = focusRing();

/**
 * An on or off switch: a pill with a knob at the end it is set to.
 * `on` is where it starts, and a press or Space turns it; `onChange`
 * hears each turn, and a screen that passes it owns `on`. `label` is
 * what a screen reader calls it; `disabled` greys it and takes no press.
 */
export function Toggle(inputs: Inputs<{ on?: boolean; defaultOn?: boolean; onChange?: (on: boolean) => void; label?: string; disabled?: boolean }>): UiChild {
  const on = controlled({ component: 'Toggle', name: 'on', source: inputs.on, initial: inputs.defaultOn, fallback: false, onChange: inputs.onChange });
  const turn = () => on.change(!on.current());
  return (
    <row
      role="switch"
      label={inputs.label}
      focusable={true}
      disabled={inputs.disabled}
      states={on.value.pipe(map(value => (value ? ['checked' as const] : [])))}
      modifiers={[PRESS, RING]}
      // The hover and press above ease in and out rather than snap.
      transition={{ opacity: 'fast' }}
      onClick={turn}
      onKeyDown={(event: UiKeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
          turn();
          event.preventDefault();
        }
      }}
      width={40}
      height={24}
      padding={3}
      borderRadius="full"
      x={on.value.pipe(map(value => (value ? 'end' : 'start')))}
      backgroundColor={on.value.pipe(map(value => (value ? 'primary' : 'controlBorder')))}
      opacity={inputs.disabled.pipe(map(disabled => (disabled === true ? 0.5 : 1)))}>
      <box width={18} height={18} borderRadius="full" backgroundColor="controlBackground" />
    </row>
  );
}
