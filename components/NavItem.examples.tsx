import * as C from './NavItem';

const INBOX = new URL('../assets/icons/inbox.svg', import.meta.url).href;
const WAITING = new URL('../assets/icons/clock.svg', import.meta.url).href;

export const NavItem = {
  Selected: <C.NavItem label="Inbox" icon={INBOX} count={4} selected={true} />,
  Default: <C.NavItem label="Waiting" icon={WAITING} count={3} />,
  TabBar: <C.NavItem label="Inbox" icon={INBOX} placement="tabBar" selected={true} />,
  TabBarDefault: <C.NavItem label="Waiting" icon={WAITING} placement="tabBar" />
};
