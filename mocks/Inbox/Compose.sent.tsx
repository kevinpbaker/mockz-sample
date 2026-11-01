import { map } from 'rxjs';

import { sharedValue, type ComponentContext } from 'gesso-framework';

import { AppShell } from '../../components/AppShell';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';

const SENT = new URL('../../assets/icons/circle-check.svg', import.meta.url).href;

/** After Send: who the new conversation went to, from what was typed in To. */
export function Compose(_inputs: unknown, ctx: ComponentContext) {
  const to = sharedValue(ctx, 'to', 'theo.lindqvist@example.com');
  return (
    <AppShell current="inbox">
      <EmptyState icon={SENT} title="Sent" body={to.pipe(map(address => `Your message went to ${address}. The reply shows in your inbox.`))}>
        <Button label="Back to inbox" variant="secondary" size="small" />
      </EmptyState>
    </AppShell>
  );
}
