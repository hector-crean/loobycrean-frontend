import type { EasingFunction, TransitionConfig } from 'svelte/transition';
import {} from 'svelte/transition';
export interface ScaleYParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
}
function scaleY(
	node: Element,
	{ delay = 0, duration = 400, easing }: ScaleYParams
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `
			transform: ${transform} scaleY(${1 - 1 * u});
		`
	};
}

export { scaleY };
