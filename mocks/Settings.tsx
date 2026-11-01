import { percent } from 'gesso-core';

import { PageHeader } from '../components/PageHeader';
import { SettingsRow } from '../components/SettingsRow';
import { Toggle } from '../components/Toggle';

/** Account settings: notifications and privacy, a toggle each. */
export function Settings() {
  return (
    <column width={percent(100)} height={percent(100)} backgroundColor="background" padding={24} x="center">
      <column width={percent(100)} maxWidth={720} gap={8}>
        <PageHeader title="Settings" subtitle="How the app reaches you, and what it keeps." />
        <text text="Notifications" textStyle="title" paddingTop={12} />
        <SettingsRow label="Email digest" description="A summary of the week, every Monday.">
          <Toggle on={true} />
        </SettingsRow>
        <SettingsRow label="Mentions" description="When someone names you in a comment.">
          <Toggle on={true} />
        </SettingsRow>
        <SettingsRow label="Product news">
          <Toggle on={false} />
        </SettingsRow>
        <text text="Privacy" textStyle="title" paddingTop={12} />
        <SettingsRow label="Show my activity" description="Others see when you were last here.">
          <Toggle on={false} />
        </SettingsRow>
      </column>
    </column>
  );
}
