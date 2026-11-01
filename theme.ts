import {
  boxShadow,
  defineMotion,
  defineThemeExtension,
  lightTheme,
  rgb8,
  type UiColor,
  type UiColors,
  type UiShadows,
  type UiTextStyle,
  type UiTheme
} from 'gesso-core';

/**
 * Harbor's design system: a shared inbox for a small shop's support
 * team. Warm neutrals, a pine green that says "act here", a clay that
 * says "waiting", and Inter throughout. Every screen and component
 * takes its colors, type, radii, shadows, sizes and timing from here
 * by name, so a change here reaches all of them, light and dark.
 */

declare module 'gesso-core' {
  interface UiTypographyExtensions {
    /** An empty state's or a sign-in's one big line: Inter Bold 28. */
    readonly display: unknown;
    /** A name or a subject that has not been read: body, in SemiBold. */
    readonly bodyStrong: unknown;
    /** A small heading over a group of items, such as Views in the sidebar. */
    readonly overline: unknown;
    /** What a person types. 16 on a touch screen, which a phone does not zoom into. */
    readonly input: unknown;
  }
  interface UiDurationExtensions {
    /** A control answering a press: shorter than `fast`, so it feels instant. */
    readonly press: unknown;
  }
}

/** A color as a designer writes it: `#2E5E4E`, or `#1B1A18` and an alpha from 0 to 1. */
function hex(value: string, alpha = 1): UiColor {
  const n = Number.parseInt(value.slice(1), 16);
  return rgb8((n >> 16) & 255, (n >> 8) & 255, n & 255, Math.round(alpha * 255));
}

// #region Color
const light: UiColors = {
  background: hex('#FFFFFF'),
  surface: hex('#F6F5F2'),
  primary: hex('#2E5E4E'),
  secondary: hex('#A84E28'),
  text: hex('#1B1A18'),
  textMuted: hex('#67635C'),
  border: hex('#E8E5DF'),
  shadow: hex('#1B1A18', 0.16),
  placeholder: hex('#EEECE7'),
  scrim: hex('#1B1A18', 0.4),
  controlBackground: hex('#FFFFFF'),
  controlBackgroundHovered: hex('#F2F0EC'),
  controlBackgroundPressed: hex('#E8E5DF'),
  controlBorder: hex('#D5D1C9'),
  controlForeground: hex('#1B1A18'),
  controlForegroundDisabled: hex('#A29D94'),
  controlAccent: hex('#2E5E4E'),
  danger: hex('#C0392B'),
  focusRing: hex('#2E5E4E'),
  selectionBackground: hex('#E5EFEA'),
  selectionForeground: hex('#1E4A3C'),
  tooltipBackground: hex('#1B1A18'),
  tooltipForeground: hex('#FFFFFF')
};

const dark: UiColors = {
  background: hex('#121211'),
  surface: hex('#1B1A18'),
  primary: hex('#86C5AE'),
  secondary: hex('#E59A72'),
  text: hex('#F1EFEA'),
  textMuted: hex('#A39E95'),
  border: hex('#2B2926'),
  shadow: hex('#000000', 0.5),
  placeholder: hex('#26241F'),
  scrim: hex('#000000', 0.6),
  controlBackground: hex('#1B1A18'),
  controlBackgroundHovered: hex('#242220'),
  controlBackgroundPressed: hex('#2E2C28'),
  controlBorder: hex('#3A3732'),
  controlForeground: hex('#F1EFEA'),
  controlForegroundDisabled: hex('#6B675F'),
  controlAccent: hex('#86C5AE'),
  danger: hex('#EF7B6C'),
  focusRing: hex('#86C5AE'),
  selectionBackground: hex('#1F302A'),
  selectionForeground: hex('#B9E2D2'),
  tooltipBackground: hex('#2E2C28'),
  tooltipForeground: hex('#F1EFEA')
};
// #endregion

// #region Type
/** Inter at a size, a weight and a line height on the 4-pixel grid. Inter is set a little tighter as it grows. */
function inter(fontSize: number, fontWeight: number, lineHeight: number, letterSpacing = 0): UiTextStyle {
  return { ...lightTheme.typography.body, fontFamily: 'Inter', fontSize, fontWeight, lineHeight, letterSpacing, color: light.text };
}

const typography = {
  display: inter(28, 700, 36, -0.6),
  headline: inter(22, 600, 28, -0.4),
  title: inter(16, 600, 24, -0.2),
  bodyLarge: inter(15, 400, 22, -0.1),
  body: inter(14, 400, 20, -0.1),
  bodyStrong: inter(14, 600, 20, -0.1),
  bodySmall: inter(12, 400, 16),
  label: inter(12, 500, 16),
  overline: inter(11, 600, 16, 0.6),
  input: inter(14, 400, 20, -0.1)
} as UiTheme['typography'];

/** The same scale in another ink, for the dark theme. */
function inked(scale: UiTheme['typography'], color: UiColor): UiTheme['typography'] {
  return Object.fromEntries(Object.entries(scale).map(([role, style]) => [role, { ...(style as UiTextStyle), color }])) as unknown as UiTheme['typography'];
}
// #endregion

// #region Shadow
function shadows(ink: UiColor, strength: number): UiShadows {
  const tint = (alpha: number) => ({ ...ink, a: Math.min(1, alpha * strength) });
  return {
    none: [],
    extraSmall: [boxShadow(0, 1, 2, 0, tint(0.05))],
    small: [boxShadow(0, 1, 3, 0, tint(0.08)), boxShadow(0, 1, 2, -1, tint(0.06))],
    medium: [boxShadow(0, 4, 12, -2, tint(0.08)), boxShadow(0, 2, 4, -2, tint(0.06))],
    large: [boxShadow(0, 12, 24, -6, tint(0.12)), boxShadow(0, 4, 8, -4, tint(0.06))],
    extraLarge: [boxShadow(0, 24, 48, -12, tint(0.18)), boxShadow(0, 8, 16, -8, tint(0.08))]
  };
}
// #endregion

/**
 * How tall a control is, and how far its label sits from its sides:
 * bigger for a finger, as Mockz draws a Touch frame. `navItem` is a
 * sidebar row; `target` is the least a small control (a toggle) takes
 * to press, around what it draws. Components read it with
 * `themeTokenCell(controlSizes)`.
 */
export const controlSizes = defineThemeExtension({
  name: 'harbor.controlSizes',
  defaults: { small: { height: 32, paddingX: 12 }, medium: { height: 36, paddingX: 16 }, navItem: 32, target: 24 },
  coarse: { small: { height: 44, paddingX: 12 }, medium: { height: 48, paddingX: 16 }, navItem: 44, target: 44 }
});

export const theme: UiTheme = {
  ...lightTheme,
  colors: light,
  typography,
  shapes: { none: 0, extraSmall: 4, small: 6, medium: 10, large: 14, extraLarge: 20, full: 9999 },
  shadows: shadows(hex('#1B1A18'), 1),
  // On a touch screen, typed text is 16: a phone zooms into anything smaller.
  touch: { typography: { input: inter(16, 400, 24, -0.1) } as Partial<UiTheme['typography']> }
};

export const darkTheme: UiTheme = {
  ...theme,
  colors: dark,
  typography: inked(typography, dark.text),
  shadows: shadows(hex('#000000'), 3),
  touch: { typography: { input: { ...inter(16, 400, 24, -0.1), color: dark.text } } as Partial<UiTheme['typography']> }
};

/** Harbor's timing: quick on a press, Gesso's for the rest. */
export const motion = defineMotion({ durations: { fast: 140, press: 90 } });

export { fonts } from './fonts/fonts';
