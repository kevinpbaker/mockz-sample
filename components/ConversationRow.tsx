import { map } from 'rxjs';

import { focusRing, interactive, type UiChild, type UiKeyboardEvent } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { StatusPill } from './StatusPill';

const TAG = new URL('../assets/icons/tag.svg', import.meta.url).href;

/** A tint under the pointer, a deeper one while pressed. Made once and shared. */
const PRESS = interactive({
  hover: true,
  press: true,
  hovered: { backgroundColor: 'controlBackgroundHovered' },
  pressed: { backgroundColor: 'controlBackgroundPressed' }
});
const RING = focusRing();

/**
 * One conversation in the inbox: who wrote, when, the subject and the
 * start of the last message, its status and its tag. `unread` sets the
 * name and subject in bold with a dot; `selected` is the one open
 * beside the list. `compact` is one line a conversation: name, subject
 * and status. A press opens it.
 */
export function ConversationRow(
  inputs: Inputs<{
    name: string;
    subject: string;
    preview: string;
    time: string;
    status: 'new' | 'open' | 'waiting' | 'resolved';
    tag?: string;
    unread?: boolean;
    selected?: boolean;
    compact?: boolean;
    onPress?: () => void;
  }>
): UiChild {
  const unread = inputs.unread.pipe(map(unread => unread === true));
  const strong = unread.pipe(map(bold => (bold ? 'bodyStrong' : 'body')));
  const compact = inputs.compact.pipe(map(compact => compact === true));
  const press = () => inputs.onPress.emit();
  return (
    <row
      role="button"
      label={inputs.subject}
      focusable={true}
      modifiers={[PRESS, RING]}
      onClick={press}
      onKeyDown={(event: UiKeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
          press();
          event.preventDefault();
        }
      }}
      states={inputs.selected.pipe(map(selected => (selected === true ? ['selected' as const] : [])))}
      gap={12}
      paddingX={12}
      paddingY={compact.pipe(map(one => (one ? 8 : 12)))}
      y={compact.pipe(map(one => (one ? 'center' : 'start')))}
      borderRadius="medium"
      backgroundColor={inputs.selected.pipe(map(selected => (selected === true ? 'selectionBackground' : undefined)))}>
      <box position="relative" flexShrink={0}>
        <Avatar name={inputs.name} size={compact.pipe(map(one => (one ? 'small' : 'medium')))} />
        <box
          position="absolute"
          top={-2}
          right={-2}
          width={10}
          height={10}
          borderRadius="full"
          borderWidth={2}
          borderColor="background"
          backgroundColor="primary"
          visible={unread}
        />
      </box>
      {compact.pipe(
        map(one =>
          one
            ? [
                <row key="line" gap={12} y="center" flex={1} minWidth={0}>
                  <text text={inputs.name} textStyle={strong} width={144} flexShrink={0} maxLines={1} textOverflow="ellipsis" />
                  <text text={inputs.subject} textStyle={strong} flex={1} minWidth={0} maxLines={1} textOverflow="ellipsis" />
                  <StatusPill status={inputs.status} />
                  <text text={inputs.time} textStyle="bodySmall" color="textMuted" textWrap="none" width={64} textAlign="end" />
                </row>
              ]
            : [
                <column key="card" gap={2} flex={1} minWidth={0}>
                  <row gap={8} y="center">
                    <text text={inputs.name} textStyle={strong} flex={1} minWidth={0} maxLines={1} textOverflow="ellipsis" />
                    <text text={inputs.time} textStyle="bodySmall" color="textMuted" textWrap="none" />
                  </row>
                  <text text={inputs.subject} textStyle={strong} maxLines={1} textOverflow="ellipsis" />
                  <text text={inputs.preview} textStyle="bodySmall" color="textMuted" maxLines={1} textOverflow="ellipsis" />
                  <row gap={8} y="center" paddingTop={4}>
                    <StatusPill status={inputs.status} />
                    {inputs.tag.pipe(
                      map(tag =>
                        tag === undefined
                          ? []
                          : [
                              <row key="tag" gap={4} y="center" color="textMuted">
                                <Icon src={TAG} />
                                <text text={tag} textStyle="label" color="textMuted" />
                              </row>
                            ]
                      )
                    )}
                  </row>
                </column>
              ]
        )
      )}
    </row>
  );
}
