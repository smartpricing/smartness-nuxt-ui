import type { DefineComponent, VNode } from "vue";
import { h, render } from "vue";

export function useComponentRenderToHTML<Props extends Record<string, unknown>>(
	component: DefineComponent<Props> | ((props: Props) => VNode),
	props?: Props
): string {
	const container = document.createElement("div");
	render(h(component as DefineComponent, props), container);
	const html = container.innerHTML;
	container.remove();
	return html;
}
