import { map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent, type UiNode } from 'gesso-core';
import { Popover } from 'gesso-components';
import { controlled, internalState, themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';
import { Avatar } from './Avatar';
import { Icon } from './Icon';

const CHEVRON = new URL('../assets/icons/chevron-down.svg', import.meta.url).href;
const CHECK = new URL('../assets/icons/check.svg', import.meta.url).href;
const NOBODY = new URL('../assets/icons/user-round-plus.svg', import.meta.url).href;

/** The team a conversation can go to. */
const TEAM = ['Sam Okoro', 'Lena Park', 'Ana Ruiz'];

/** A tint under the pointer, a deeper one while pressed. Made once and shared. */
const PRESS = interactive({
  hover: true,
  press: true,
  hovered: { backgroundColor: 'controlBackgroundHovered' },
  pressed: { backgroundColor: 'controlBackgroundPressed' }
});
const RING = focusRing();

/**
 * Who a conversation is assigned to: the person, and a list of the
 * team to give it to, which opens under it. `value` (or
 * `defaultValue`) is the person's name, empty for nobody; `open` (or
 * `defaultOpen`) is whether the list shows.
 */
export function AssignMenu(
  inputs: Inputs<{
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>
): UiChild {
  const sizes = themeTokenCell(controlSizes);
  const value = controlled({ component: 'AssignMenu', name: 'value', source: inputs.value, initial: inputs.defaultValue, fallback: '', onChange: inputs.onChange });
  const open = controlled({ component: 'AssignMenu', name: 'open', source: inputs.open, initial: inputs.defaultOpen, fallback: false, onChange: inputs.onOpenChange });
  const anchor = internalState<UiNode | null>(null);
  const choose = (name: string) => {
    value.change(name);
    open.change(false);
  };
  const option = (name: string) => (
    <row
      key={name === '' ? 'nobody' : name}
      role="radio"
      label={name === '' ? 'Nobody' : name}
      focusable={true}
      states={value.value.pipe(map(current => (current === name ? ['checked' as const] : [])))}
      modifiers={[PRESS, RING]}
      onClick={() => choose(name)}
      onKeyDown={(event: UiKeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
          choose(name);
          event.preventDefault();
        }
      }}
      gap={8}
      y="center"
      height={sizes.select(tokens => tokens.navItem)}
      paddingX={8}
      borderRadius="small">
      {name === '' ? (
        <box width={24} height={24} borderRadius="full" x="center" y="center" backgroundColor="placeholder" color="textMuted">
          <Icon src={NOBODY} />
        </box>
      ) : (
        <Avatar name={name} tone="team" size="small" />
      )}
      <text text={name === '' ? 'Nobody' : name} textStyle="body" flex={1} />
      <row color="primary" opacity={value.value.pipe(map(current => (current === name ? 1 : 0)))}>
        <Icon src={CHECK} />
      </row>
    </row>
  );
  return (
    <column modifiers={[sizes.modifier]}>
      <row
        ref={(node: UiNode | null) => (anchor.value = node)}
        role="button"
        label={value.value.pipe(map(current => (current === '' ? 'Assign' : `Assigned to ${current}`)))}
        focusable={true}
        modifiers={[PRESS, RING]}
        gap={8}
        y="center"
        height={sizes.select(tokens => tokens.small.height)}
        paddingX={8}
        borderRadius="medium"
        borderWidth={1}
        borderColor="controlBorder"
        backgroundColor="controlBackground">
        {value.value.pipe(
          map(current =>
            current === ''
              ? [
                  <row key="nobody" color="textMuted">
                    <Icon src={NOBODY} />
                  </row>
                ]
              : [<Avatar key="person" name={current} tone="team" size="small" />]
          )
        )}
        <text text={value.value.pipe(map(current => (current === '' ? 'Assign' : current)))} textStyle="bodyStrong" textWrap="none" />
        <row color="textMuted">
          <Icon src={CHEVRON} />
        </row>
      </row>
      <Popover
        open={open.value}
        onOpenChange={(next: boolean) => open.change(next)}
        anchor={anchor}
        label="Assign to"
        side="bottom"
        align="start"
        width={240}
        content={
          <column gap={2} padding={4}>
            <text text="Assign to" textStyle="overline" color="textMuted" paddingX={8} paddingTop={4} paddingBottom={4} />
            {TEAM.map(option)}
            <box height={1} marginY={4} backgroundColor="border" />
            {option('')}
          </column>
        }
      />
    </column>
  );
}
