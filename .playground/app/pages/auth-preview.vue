<template>
	<SAuthLayout
		:left-position="leftPosition"
		:right-position="rightPosition"
	>
		<template #top-right>
			<div class="flex items-center gap-3">
				<USelect
					v-model="leftPosition"
					:items="positions"
					class="w-[160px]"
				/>
				<USelect
					v-model="rightPosition"
					:items="positions"
					class="w-[160px]"
				/>
			</div>
		</template>
		<SAuthFormCard title="Welcome back">
			<div class="space-y-4">
				<UFormField label="Email">
					<UInput placeholder="you@example.com" class="w-full" />
				</UFormField>
				<UFormField label="Password">
					<UInput type="password" placeholder="••••••••" class="w-full" />
				</UFormField>
				<UButton label="Sign in" color="primary" block />
			</div>
		</SAuthFormCard>
		<template #bottom>
			<a href="#" class="pointer-events-auto text-xs text-primary-700 underline-offset-2 hover:text-primary-900 hover:underline">
				Terms and Conditions
			</a>
		</template>
	</SAuthLayout>
</template>

<script setup lang="ts">
	definePageMeta({ layout: false });

	type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

	const positions: Position[] = ["top-left", "top-right", "bottom-left", "bottom-right", "center"];
	const leftPosition = ref<Position>("top-left");
	const rightPosition = ref<Position>("bottom-right");

	useHead({ title: "Auth Preview - Smartness UI" });
</script>
