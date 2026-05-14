<template>
	<UDashboardPanel v-bind="panelProps ?? {}">
		<template v-if="$slots.header" #header>
			<slot name="header" />
		</template>

		<template #body="bodyData">
			<div class="flex-1 flex flex-col min-h-0">
				<slot v-bind="bodyData" />
			</div>
		</template>

		<template v-if="$slots.footer" #footer="footerData">
			<slot name="footer" v-bind="footerData" />
		</template>
	</UDashboardPanel>
</template>

<script setup lang="ts">
	import type { DashboardPanelProps } from "@nuxt/ui";

	defineProps<{
		/** Forwarded to `UDashboardPanel` (e.g. `id`, `ui`, Nuxt UI panel options). */
		panelProps?: Partial<DashboardPanelProps> & Record<string, unknown>
	}>();
</script>
