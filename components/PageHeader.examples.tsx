import { Button } from './Button';
import * as C from './PageHeader';

const BACK = new URL('../assets/icons/arrow-left.svg', import.meta.url).href;

export const PageHeader = {
  Default: <C.PageHeader title="Inbox" subtitle="4 open conversations" />,
  WithAction: <C.PageHeader title="Inbox" subtitle="4 open conversations" action={<Button label="New" size="small" />} />,
  WithBack: <C.PageHeader title="Order #4821" leading={<Button label="Back to inbox" icon={BACK} iconOnly={true} variant="quiet" />} />
};
