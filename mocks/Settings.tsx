import { percent } from 'gesso-core';
import { ScrollArea } from 'gesso-components';

import { AppShell } from '../components/AppShell';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { SettingsRow } from '../components/SettingsRow';
import { Toggle } from '../components/Toggle';

/** Your settings: your profile, when Harbor tells you something, and how work is shared. */
export function Settings() {
  return (
    <AppShell current="settings">
      <ScrollArea width={percent(100)} flex={1} minHeight={0} padding={16}>
        <column width={percent(100)} maxWidth={640} gap={16} paddingTop={8} selfX="center">
          <PageHeader title="Settings" subtitle="Only you see these settings." />
          <Card>
            <row gap={16} y="center" padding={16}>
              <Avatar name="Sam Okoro" tone="team" size="large" />
              <column gap={2} flex={1} minWidth={0}>
                <text text="Sam Okoro" textStyle="title" />
                <text text="sam@juniperceramics.example · Support" textStyle="bodySmall" color="textMuted" maxLines={1} textOverflow="ellipsis" />
              </column>
              <Button label="Edit" variant="secondary" size="small" />
            </row>
          </Card>
          <Card title="Notifications" description="When Harbor tells you something needs you.">
            <column>
              <SettingsRow label="New conversations" description="A customer writes in for the first time.">
                <Toggle on={true} label="New conversations" />
              </SettingsRow>
              <box height={1} backgroundColor="border" marginX={16} />
              <SettingsRow label="Customer replies" description="A customer answers a conversation you are on.">
                <Toggle on={true} label="Customer replies" />
              </SettingsRow>
              <box height={1} backgroundColor="border" marginX={16} />
              <SettingsRow label="Daily summary" description="Your open conversations, by email at 8:00 every morning.">
                <Toggle on={false} label="Daily summary" />
              </SettingsRow>
            </column>
          </Card>
          <Card title="Assignment" description="How new conversations get to people.">
            <column>
              <SettingsRow label="Share new conversations" description="Give each new conversation to the next person who is online.">
                <Toggle on={true} label="Share new conversations" />
              </SettingsRow>
              <box height={1} backgroundColor="border" marginX={16} />
              <SettingsRow label="Weekend replies" description="Only an admin can change this.">
                <Toggle on={false} disabled={true} label="Weekend replies" />
              </SettingsRow>
            </column>
          </Card>
        </column>
      </ScrollArea>
    </AppShell>
  );
}
