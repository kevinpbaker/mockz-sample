import { combineLatest, map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import { controlled, themeTokenCell, type Inputs } from 'gesso-framework';

import { controlSizes } from '../theme';

/**
 * A labeled field to type in. Its text goes through `value` (or
 * `defaultValue`) and `onChange`. `error` says what is wrong under the
 * field and turns its edge red; `multiline` makes it a taller box.
 */
export function TextField(
  inputs: Inputs<{
    label: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string;
    multiline?: boolean;
  }>
): UiChild {
  const sizes = themeTokenCell(controlSizes);
  const value = controlled({ component: 'TextField', name: 'value', source: inputs.value, initial: inputs.defaultValue, fallback: '', onChange: inputs.onChange });
  const wrong = inputs.error.pipe(map(error => error !== undefined));
  return (
    <column gap={4} modifiers={[sizes.modifier]}>
      <text text={inputs.label} textStyle="label" />
      <editabletext
        role="textbox"
        label={inputs.label}
        value={value.value}
        placeholder={inputs.placeholder.pipe(map(placeholder => placeholder ?? ''))}
        multiline={inputs.multiline.pipe(map(multiline => multiline === true))}
        textStyle="input"
        placeholderColor="textMuted"
        minHeight={combineLatest([sizes, inputs.multiline]).pipe(map(([tokens, multiline]) => (multiline === true ? 120 : tokens.medium.height)))}
        verticalAlign={inputs.multiline.pipe(map(multiline => (multiline === true ? 'top' : 'middle')))}
        paddingX={12}
        paddingY={8}
        borderRadius="medium"
        borderWidth={1}
        borderColor={wrong.pipe(map(isWrong => (isWrong ? 'danger' : 'controlBorder')))}
        backgroundColor="controlBackground"
        onInput={event => value.change(event.value)}
      />
      {inputs.error.pipe(map(error => (error === undefined ? [] : [<text key="error" text={error} textStyle="bodySmall" color="danger" />])))}
    </column>
  );
}
