import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import { controlled, themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';
import { Icon } from './Icon';

const SEARCH = new URL('../assets/icons/search.svg', import.meta.url).href;

/**
 * A field to find something by typing: a magnifier, then the text. Its
 * text goes through `value` (or `defaultValue`) and `onChange`.
 */
export function SearchField(inputs: Inputs<{ value?: string; defaultValue?: string; onChange?: (value: string) => void; placeholder?: string }>): UiChild {
  const sizes = themeTokenCell(controlSizes);
  const value = controlled({ component: 'SearchField', name: 'value', source: inputs.value, initial: inputs.defaultValue, fallback: '', onChange: inputs.onChange });
  return (
    <row
      modifiers={[sizes.modifier]}
      gap={8}
      y="center"
      height={sizes.select(tokens => tokens.small.height)}
      paddingX={12}
      borderRadius="medium"
      borderWidth={1}
      borderColor="border"
      backgroundColor="surface"
      color="textMuted">
      <Icon src={SEARCH} />
      <editabletext
        role="textbox"
        label={inputs.placeholder.pipe(map(placeholder => placeholder ?? 'Search'))}
        value={value.value}
        placeholder={inputs.placeholder.pipe(map(placeholder => placeholder ?? 'Search'))}
        textStyle="input"
        placeholderColor="textMuted"
        flex={1}
        minWidth={0}
        height={sizes.select(tokens => tokens.small.height)}
        verticalAlign="middle"
        onInput={event => value.change(event.value)}
      />
    </row>
  );
}
