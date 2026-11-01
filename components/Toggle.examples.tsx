import * as C from './Toggle';

export const Toggle = {
  On: <C.Toggle on={true} label="Email digest" />,
  Off: <C.Toggle on={false} label="Email digest" />,
  Disabled: <C.Toggle on={true} disabled={true} label="Weekend replies" />
};
