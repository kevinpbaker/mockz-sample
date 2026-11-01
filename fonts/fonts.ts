import type { FontFamilyDeclaration } from 'gesso-framework';

/**
 * The project's fonts, a family to each folder beside this file. Written
 * by Mockz's font importer from the files themselves: import fonts
 * there, or add files to a family's folder, rather than changing this.
 */
export const fonts: readonly FontFamilyDeclaration[] = [
  {
    family: 'Inter',
    faces: [
      { source: new URL('./Inter/Inter-400.ttf', import.meta.url).href, weight: 400 },
      { source: new URL('./Inter/Inter-500.ttf', import.meta.url).href, weight: 500 },
      { source: new URL('./Inter/Inter-600.ttf', import.meta.url).href, weight: 600 },
      { source: new URL('./Inter/Inter-700.ttf', import.meta.url).href, weight: 700 }
    ]
  }
];
