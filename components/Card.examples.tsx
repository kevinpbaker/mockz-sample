import * as C from './Card';
import { SettingsRow } from './SettingsRow';
import { Toggle } from './Toggle';

export const Card = {
  Settings: (
    <C.Card title="Notifications" description="When Harbor tells you something needs you.">
      <column>
        <SettingsRow label="New conversations" description="A customer writes in for the first time.">
          <Toggle on={true} label="New conversations" />
        </SettingsRow>
        <box height={1} backgroundColor="border" />
        <SettingsRow label="Customer replies" description="A customer answers a conversation you are on.">
          <Toggle on={false} label="Customer replies" />
        </SettingsRow>
      </column>
    </C.Card>
  )
};
