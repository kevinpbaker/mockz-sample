import { map } from 'rxjs';

import type { UiChild } from 'gesso-core';
import type { Inputs } from 'gesso-framework';

import { Avatar } from './Avatar';
import { Icon } from './Icon';

const FILE = new URL('../assets/icons/image.svg', import.meta.url).href;

/**
 * One message in a conversation: who wrote it, when, and what it says.
 * `from` is the customer, the team, or a `note` only the team sees,
 * set on a tinted card and marked Team only. An `attachment` is a
 * file's name and size.
 */
export function Message(
  inputs: Inputs<{ author: string; time: string; body: string; from?: 'customer' | 'team' | 'note'; attachment?: string }>
): UiChild {
  const note = inputs.from.pipe(map(from => from === 'note'));
  return (
    <row
      gap={12}
      padding={note.pipe(map(isNote => (isNote ? 16 : 0)))}
      borderRadius="large"
      borderWidth={note.pipe(map(isNote => (isNote ? 1 : 0)))}
      borderColor="border"
      backgroundColor={note.pipe(map(isNote => (isNote ? 'surface' : undefined)))}>
      <Avatar name={inputs.author} tone={inputs.from.pipe(map(from => (from === 'customer' || from === undefined ? 'customer' : 'team')))} />
      <column gap={4} flex={1} minWidth={0}>
        <row gap={8} y="center">
          <text text={inputs.author} textStyle="bodyStrong" textWrap="none" />
          <text text={inputs.time} textStyle="bodySmall" color="textMuted" textWrap="none" />
          {note.pipe(
            map(isNote =>
              isNote
                ? [
                    <row key="note" paddingX={8} height={20} y="center" borderRadius="full" borderWidth={1} borderColor="border" backgroundColor="background">
                      <text text="Team only" textStyle="label" color="secondary" textWrap="none" />
                    </row>
                  ]
                : []
            )
          )}
        </row>
        <text text={inputs.body} textStyle="body" />
        {inputs.attachment.pipe(
          map(file =>
            file === undefined
              ? []
              : [
                  <row key="file" gap={8} y="center" marginTop={8} paddingX={12} height={36} selfX="start" borderRadius="medium" borderWidth={1} borderColor="border" backgroundColor="background" color="textMuted">
                    <Icon src={FILE} />
                    <text text={file} textStyle="label" color="text" textWrap="none" />
                  </row>
                ]
          )
        )}
      </column>
    </row>
  );
}
