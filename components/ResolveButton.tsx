import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import { Dialog } from 'gesso-components';
import { controlled, type Inputs } from 'gesso-framework';

import { Button } from './Button';

const DONE = new URL('../assets/icons/check.svg', import.meta.url).href;

/**
 * Mark resolved, and the dialog it opens to make sure: what the
 * customer gets, and Resolve or Cancel. `open` (or `defaultOpen`) is
 * whether the dialog shows; `iconOnly` keeps the button small on a phone.
 */
export function ResolveButton(
  inputs: Inputs<{ customer: string; iconOnly?: boolean; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; onResolve?: () => void }>
): UiChild {
  const open = controlled({ component: 'ResolveButton', name: 'open', source: inputs.open, initial: inputs.defaultOpen, fallback: false, onChange: inputs.onOpenChange });
  return (
    <column>
      <Button label="Mark resolved" icon={DONE} iconOnly={inputs.iconOnly} variant="secondary" size="small" onPress={() => open.change(true)} />
      <Dialog
        open={open.value}
        onClose={() => open.change(false)}
        title="Resolve this conversation?"
        width={400}
        content={
          <column gap={24}>
            <text
              text={inputs.customer.pipe(map(customer => `${customer} gets an email that says it is resolved. If ${customer.split(' ')[0]} replies, it opens again.`))}
              textStyle="body"
              color="textMuted"
            />
            <row gap={8} x="end">
              <Button label="Cancel" variant="secondary" onPress={() => open.change(false)} />
              <Button
                label="Resolve"
                icon={DONE}
                onPress={() => {
                  inputs.onResolve.emit();
                  open.change(false);
                }}
              />
            </row>
          </column>
        }
      />
    </column>
  );
}
