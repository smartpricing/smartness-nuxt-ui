import type { AppContext, DefineComponent, VNode } from "vue";
import { h, render } from "vue";

export function useComponentRenderToHTML<Props extends Record<string, unknown>>(
	component: DefineComponent<Props> | ((props: Props) => VNode),
	props?: Props,
	appContext?: AppContext | null
): string {
	const container = document.createElement("div");
	const vnode = h(component as DefineComponent, props);

	if (appContext) {
		vnode.appContext = appContext;
	}

	render(vnode, container);
	const html = container.innerHTML;
	render(null, container);
	container.remove();
	return html;
}
