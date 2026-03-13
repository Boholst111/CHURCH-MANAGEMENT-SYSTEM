declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  export function axe(html: Element | Document): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): { pass: boolean; message: () => string };
  export function configureAxe(options: any): typeof axe;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

export {};
