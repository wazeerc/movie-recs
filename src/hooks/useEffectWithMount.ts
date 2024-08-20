import React from "react";

/**
 * Custom hook: Executes a callback function after the component has mounted and whenever the dependencies change.
 * - If the component has mounted, the callback function is executed.
 * - If the component has not mounted, the ref is set to true.
 * @param callback - The callback function to be executed.
 * @param dependencies - An optional array of dependencies.
 */
export default function useEffectWithMount(
  callback: () => void,
  dependencies: unknown[] = []
): void {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMounted.current ? callback() : (isMounted.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
