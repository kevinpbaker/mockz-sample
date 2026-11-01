import * as C from './Button';

const SEND = new URL('../assets/icons/send-horizontal.svg', import.meta.url).href;
const MORE = new URL('../assets/icons/ellipsis.svg', import.meta.url).href;

export const Button = {
  Primary: <C.Button label="Send" icon={SEND} />,
  Secondary: <C.Button label="Mark resolved" variant="secondary" />,
  Quiet: <C.Button label="Assign" variant="quiet" />,
  Small: <C.Button label="New conversation" size="small" />,
  IconOnly: <C.Button label="More actions" icon={MORE} iconOnly={true} variant="quiet" />,
  Disabled: <C.Button label="Send" icon={SEND} disabled={true} />
};
