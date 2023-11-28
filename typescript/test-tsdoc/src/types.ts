/**
 * The returned object from `useAnimationFrame`
 *
 * @param elapsedTime - A callback that will be run once when the animation starts
 * @param frameCount - A callback that will be run on every frame of the animation
 * @param fps - A callback that will be run on once when the animation ends
 * @param endAnimation - A delay in ms after which the animation will start
 */
export interface IUseAnimationFrameResult {
    elapsedTime: number;
    frameCount: number;
    fps: number;
    endAnimation: () => void;
};

/**
 * Takes the factorial of `n`.
 *
 * @example
 * // If there are no code blocks, TypeDoc assumes the whole tag
 * // should be a code block. This is not valid TSDoc, but is recognized
 * // by VSCode and enables better JSDoc support.
 * factorial(1)
 *
 * @example
 * If there is a code block, then both TypeDoc and VSCode will treat
 * text outside of the code block as regular text.
 * ```ts
 * factorial(1)
 * ```
 */
export function factorial(n: number, data: IUseAnimationFrameResult): number { return 0 };