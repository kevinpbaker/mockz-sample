# mockz-sample

A sample design for [Mockz](https://design.mockz.app): **Harbor**, a shared
inbox for the support team of Juniper Ceramics, a small pottery shop. It
has three screens, two states, one flow and sixteen components, in light
and dark, at phone, tablet and desktop size. Everything is written as
Gesso TSX, which is code your developers can read.

![Harbor's inbox and conversation on a desktop, and three phone screens](.github/preview.png)

## Open it

- **In your browser:** open
  [design.mockz.app/?repo=kevinpbaker/mockz-sample](https://design.mockz.app/?repo=kevinpbaker/mockz-sample).
  You do not need an account to look.
- **In the Mac app:** clone this repository, then choose
  File › Open Project… and select the folder.

  ```sh
  git clone https://github.com/kevinpbaker/mockz-sample.git
  ```

## Try this first

1. **Play the flow.** In the screens tree, open Inbox › Reply to a customer
   and press Play. Open Maya's conversation, write a reply and press Send.
   The next screen shows what you wrote.
2. **Switch to dark.** Use Light and Dark on the frames. Every color comes
   from the theme, so the whole design changes.
3. **Look at the Components page.** Each component shows each of its
   states, and Mockz adds hover, pressed and focused.
4. **Change the brand.** In `theme.ts`, change `primary` from `#2E5E4E`
   to a color you like. All screens and components change.

## What is in it

| Where | What |
| --- | --- |
| `theme.ts` | The design system: colors (light and dark), the type scale in Inter, radii, shadows, control sizes for a mouse and a finger, and the timing of motion. |
| `fonts/` | Inter, in four weights. |
| `components/` | The parts the screens are made of. Each `.examples.tsx` file gives a component's states for the Components page. |
| `mocks/Inbox/` | The inbox, its empty state, a conversation, the conversation after a reply, and the flow that connects them (`flows.ts`). |
| `mocks/Settings.tsx` | Your profile, notifications and assignment settings. |
| `assets/icons/` | Icons from [Lucide](https://lucide.dev). |

### Components

| Component | What it is for |
| --- | --- |
| `AppShell` | The sidebar from a tablet up, and the tab bar on a phone. |
| `Avatar` | A person's initials in a circle. |
| `Button` | Primary, secondary and quiet buttons, with an icon or without. |
| `Card` | A group of related rows, with a title. |
| `ConversationRow` | One conversation in the inbox: unread, read or selected. |
| `EmptyState` | What a list shows when it has nothing in it. |
| `Icon` | One of the project's icons, in the color of the text around it. |
| `InboxList` | The inbox's header, search and conversations. |
| `Message` | One message in a conversation, or a note only the team sees. |
| `NavItem` | A place in the app, in the sidebar or in the tab bar. |
| `PageHeader` | The title of a screen, with room for a back button and actions. |
| `ReplyBox` | Where the team writes a reply. |
| `SearchField` | A field to find a conversation. |
| `SettingsRow` | One setting and its control. |
| `StatusPill` | New, open, waiting or resolved. |
| `Toggle` | An on and off switch. |

## How it is written

Use this sample as a model for your own design:

- **Tokens by name, not values.** Write `backgroundColor="surface"`,
  `textStyle="title"` and `borderRadius="medium"`. Mockz's checker finds
  values that are not in the theme.
- **Controls that work in Play.** Buttons, rows, toggles and fields have a
  role, take focus, and answer the pointer and the keyboard. Their values
  go through `controlled`, so a screen can write `<Toggle on={true} />`
  and Play can turn it.
- **Sizes that follow touch.** Phone and tablet frames are touch frames.
  Controls get their height from `controlSizes` in `theme.ts`, so they
  are at least 44 pixels high there.
- **Motion by name.** Hover and press ease with `transition={{ opacity:
  'press' }}`. `theme.ts` sets how long `press` is.
- **States are inputs.** A selected row is `<ConversationRow selected={true} />`.
  A screen does not draw a state by hand.

All the people, the shop and the text in this design are made up.
Inter is under the [SIL Open Font License](fonts/Inter/OFL.txt), and
Lucide's icons are under the ISC License.
