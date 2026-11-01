import * as C from './SettingsRow';
import { Toggle } from './Toggle';

export const SettingsRow = {
  WithDescription: (
    <C.SettingsRow label="New conversations" description="Tell me when a customer writes in for the first time.">
      <Toggle on={true} label="New conversations" />
    </C.SettingsRow>
  ),
  LabelOnly: (
    <C.SettingsRow label="Product news">
      <Toggle on={false} label="Product news" />
    </C.SettingsRow>
  )
};
