import { Button } from './Button';
import * as C from './EmptyState';

const DONE = new URL('../assets/icons/circle-check.svg', import.meta.url).href;
const SEARCH = new URL('../assets/icons/search.svg', import.meta.url).href;

export const EmptyState = {
  CaughtUp: (
    <C.EmptyState icon={DONE} title="You are all caught up" body="Every customer has an answer. New conversations show here.">
      <Button label="See resolved" variant="secondary" size="small" />
    </C.EmptyState>
  ),
  NoResults: <C.EmptyState icon={SEARCH} title="No conversations found" body="Try a customer's name, an order number or a word from the message." />
};
