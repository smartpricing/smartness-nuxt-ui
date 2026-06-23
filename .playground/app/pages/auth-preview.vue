<template>
	<SAuthLayout :chevrons="enabledChevrons">
		<template #top-right>
			<div class="flex items-center gap-4">
				<label
					v-for="corner in allCorners"
					:key="corner"
					class="flex items-center gap-1.5 text-xs text-primary-700 cursor-pointer select-none"
				>
					<input
						v-model="checked"
						type="checkbox"
						:value="corner"
						class="accent-primary"
					>
					{{ corner }}
				</label>
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

	type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

	const allCorners: Corner[] = ["top-left", "top-right", "bottom-left", "bottom-right"];
	const checked = ref<Corner[]>(["top-left", "bottom-right"]);
	const enabledChevrons = computed(() => checked.value);

	useHead({ title: "Auth Preview - Smartness UI" });
</script>
