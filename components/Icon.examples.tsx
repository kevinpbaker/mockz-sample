import * as C from './Icon';

const INBOX = new URL('../assets/icons/inbox.svg', import.meta.url).href;
const SEARCH = new URL('../assets/icons/search.svg', import.meta.url).href;

export const Icon = {
  Small: <C.Icon src={SEARCH} />,
  Large: <C.Icon src={INBOX} size={20} />
};
