import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import { controlled, type Inputs } from 'gesso-framework';

import { Button } from './Button';

const ATTACH = new URL('../assets/icons/paperclip.svg', import.meta.url).href;
const SEND = new URL('../assets/icons/send-horizontal.svg', import.meta.url).href;

/**
 * Where the team writes back: a box to type in, a button to attach a
 * file, and Send. Its text goes through `value` (or `defaultValue`) and
 * `onChange`, so a flow can carry what was typed to the next screen.
 * Send does nothing while the box is empty.
 */
export function ReplyBox(inputs: Inputs<{ value?: string; defaultValue?: string; onChange?: (value: string) => void; placeholder?: string; onSend?: () => void }>): UiChild {
  const value = controlled({ component: 'ReplyBox', name: 'value', source: inputs.value, initial: inputs.defaultValue, fallback: '', onChange: inputs.onChange });
  return (
    <column gap={8} padding={12} borderRadius="large" borderWidth={1} borderColor="controlBorder" backgroundColor="controlBackground" boxShadows="small">
      <editabletext
        role="textbox"
        label="Reply"
        value={value.value}
        placeholder={inputs.placeholder.pipe(map(placeholder => placeholder ?? 'Write a reply'))}
        multiline={true}
        textStyle="input"
        placeholderColor="textMuted"
        minHeight={60}
        paddingX={4}
        onInput={event => value.change(event.value)}
      />
      <row gap={8} y="center">
        <Button label="Attach a file" icon={ATTACH} iconOnly={true} variant="quiet" size="small" />
        <text text="Customers see this reply." textStyle="bodySmall" color="textMuted" flex={1} minWidth={0} maxLines={1} textOverflow="ellipsis" />
        <Button label="Send" icon={SEND} size="small" disabled={value.value.pipe(map(text => text.trim() === ''))} onPress={() => inputs.onSend.emit()} />
      </row>
    </column>
  );
}
