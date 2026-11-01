import * as C from './AppShell';

export const AppShell = {
  Inbox: (
    <C.AppShell current="inbox">
      <column padding={24}>
        <text text="A screen goes here." textStyle="body" color="textMuted" />
      </column>
    </C.AppShell>
  ),
  Settings: (
    <C.AppShell current="settings">
      <column padding={24}>
        <text text="A screen goes here." textStyle="body" color="textMuted" />
      </column>
    </C.AppShell>
  )
};
