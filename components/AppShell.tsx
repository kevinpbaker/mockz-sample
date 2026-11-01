import { map } from 'rxjs';

import { percent, Responsive, type UiChild, type UiNode } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

import { Avatar } from './Avatar';
import { NavItem } from './NavItem';

const INBOX = new URL('../assets/icons/inbox.svg', import.meta.url).href;
const ASSIGNED = new URL('../assets/icons/user-round-check.svg', import.meta.url).href;
const WAITING = new URL('../assets/icons/clock.svg', import.meta.url).href;
const RESOLVED = new URL('../assets/icons/circle-check.svg', import.meta.url).href;
const SETTINGS = new URL('../assets/icons/settings.svg', import.meta.url).href;
const TAG = new URL('../assets/icons/tag.svg', import.meta.url).href;

type Place = 'inbox' | 'assigned' | 'waiting' | 'resolved' | 'settings';

/**
 * Harbor around a screen: the sidebar from a tablet up, and the tab
 * bar on a phone. `current` is the place the screen is, which the
 * sidebar and the tab bar show as selected; the screen goes inside.
 * `navRef` hears the places' node, for a tour to point at.
 */
export function AppShell(inputs: Inputs<{ current: Place; navRef?: (node: UiNode | null) => void; children?: UiChild }>): UiChild {
  const at = (place: Place) => inputs.current.pipe(map(current => current === place));
  const nav = (node: UiNode | null) => inputs.navRef.emit(node);
  const content = (
    <column flex={1} minWidth={0} minHeight={0} backgroundColor="background">
      {inputs.children.pipe(map(child => child ?? []))}
    </column>
  );
  return Responsive({ at: [768], as: 'box', width: percent(100), height: percent(100), backgroundColor: 'background' }, size =>
    size.width >= 768 ? (
      <row width={percent(100)} height={percent(100)}>
        <column width={232} flexShrink={0} gap={24} paddingX={12} paddingY={16} backgroundColor="surface">
          <row gap={12} y="center" paddingX={4}>
            <box width={32} height={32} borderRadius="small" x="center" y="center" backgroundColor="primary">
              <text text="J" textStyle="title" color="background" />
            </box>
            <column flex={1} minWidth={0}>
              <text text="Juniper Ceramics" textStyle="bodyStrong" maxLines={1} textOverflow="ellipsis" />
              <text text="Support" textStyle="bodySmall" color="textMuted" />
            </column>
          </row>
          <column ref={nav} gap={2}>
            <NavItem label="Inbox" icon={INBOX} count={4} selected={at('inbox')} />
            <NavItem label="Assigned to me" icon={ASSIGNED} count={2} selected={at('assigned')} />
            <NavItem label="Waiting" icon={WAITING} count={3} selected={at('waiting')} />
            <NavItem label="Resolved" icon={RESOLVED} selected={at('resolved')} />
          </column>
          <column gap={2}>
            <text text="Views" textStyle="overline" color="textMuted" paddingX={8} paddingBottom={4} />
            <NavItem label="Orders" icon={TAG} count={3} />
            <NavItem label="Classes" icon={TAG} count={1} />
            <NavItem label="Wholesale" icon={TAG} count={1} />
          </column>
          <column flex={1} />
          <NavItem label="Settings" icon={SETTINGS} selected={at('settings')} />
          <row gap={8} y="center" paddingX={4}>
            <box position="relative">
              <Avatar name="Sam Okoro" tone="team" size="small" />
              <box position="absolute" right={-2} bottom={-2} width={10} height={10} borderRadius="full" borderWidth={2} borderColor="surface" backgroundColor="primary" />
            </box>
            <column flex={1} minWidth={0}>
              <text text="Sam Okoro" textStyle="label" />
              <text text="Online" textStyle="bodySmall" color="textMuted" />
            </column>
          </row>
        </column>
        <box width={1} height={percent(100)} backgroundColor="border" />
        {content}
      </row>
    ) : (
      <column width={percent(100)} height={percent(100)}>
        {content}
        <box height={1} backgroundColor="border" />
        <row ref={nav} paddingX={8} paddingTop={4} paddingBottom={24} gap={4} backgroundColor="background">
          <NavItem label="Inbox" icon={INBOX} placement="tabBar" selected={at('inbox')} />
          <NavItem label="Mine" icon={ASSIGNED} placement="tabBar" selected={at('assigned')} />
          <NavItem label="Waiting" icon={WAITING} placement="tabBar" selected={at('waiting')} />
          <NavItem label="Settings" icon={SETTINGS} placement="tabBar" selected={at('settings')} />
        </row>
      </column>
    )
  );
}
