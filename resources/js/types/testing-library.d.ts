/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toHaveFocus(): R;
    toHaveClass(...classNames: string[]): R;
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | number | string[]): R;
    toBeChecked(): R;
    toBePartiallyChecked(): R;
    toHaveStyle(css: string | Record<string, any>): R;
    toBeEmptyDOMElement(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(html: string): R;
    toHaveAccessibleDescription(description?: string | RegExp): R;
    toHaveAccessibleName(name?: string | RegExp): R;
    toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R;
    toHaveErrorMessage(message?: string | RegExp): R;
  }
}
