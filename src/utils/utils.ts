/**
 * Sets focus on a given focusable element after a specified delay.
 * @param focusableElement - The focusable element to set focus on.
 * @param delay - The delay in milliseconds before setting focus. Default is 0.
 */
export const setFocus = (focusableElement: unknown, delay: number = 0): void => {
  if (focusableElement) {
    setTimeout(() => {
      (focusableElement as HTMLElement).focus();
    }, delay);
  }
};
