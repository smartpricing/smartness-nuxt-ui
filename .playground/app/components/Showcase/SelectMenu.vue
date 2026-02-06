<template>
	<ShowcasePage
		title="SelectMenu"
		description="Searchable dropdown with create-item functionality."
	>
		<section id="add on single" class="space-y-4">
			<ProseH3>Add on Single</ProseH3>
			selected is: {{ singleAddValue }}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<UFormField label="Label">
					<USelectMenu
						v-model="singleAddValue"
						:items="singleAddItems"
						placeholder="Search"
						class="w-full"
					>
						<template #empty="{ searchTerm }">
							<UEmpty title="No results found">
								<template #actions>
									<UButton label="Add new" variant="outline" leading-icon="ph:plus" @click="addToSingle(searchTerm)" />
								</template>
							</UEmpty>
						</template>
					</USelectMenu>
				</UFormField>
			</div>
		</section>
		<section id="add on multiple" class="space-y-4">
			<ProseH3>Add on Multiple</ProseH3>
			selected is: {{ multipleAddValue }}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<UFormField label="Label">
					<USelectMenu
						v-model="multipleAddValue"
						multiple
						:create-item="{
							when: 'always',
							position: 'top',
						}"
						:items="multipleAddItems"
						placeholder="Search"
						class="w-full"
						@create="addToMultiple"
					>
						<template #create-item-label="{ item }">
							<UButton variant="link" size="sm" leading-icon="ph:plus" :label="item" />
						</template>
						<template #empty="{ searchTerm }">
							<UEmpty title="No results found">
								<template #actions>
									<UButton label="Add new" variant="outline" leading-icon="ph:plus" @click="addToMultiple(searchTerm)" />
								</template>
							</UEmpty>
						</template>
					</USelectMenu>
				</UFormField>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { SelectItem } from "@nuxt/ui";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";

	const singleAddValue = ref<string | null>(null);
	const singleAddItems = ref<SelectItem[]>(Array.from({ length: 6 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })));
	function addToSingle(searchTerm?: string) {
		if (!searchTerm) return;
		const value = searchTerm.toLowerCase();
		singleAddItems.value.push({ label: searchTerm, value });
		singleAddValue.value = value;
	}

	const multipleAddValue = ref<Array<SelectItem>>([]);
	const multipleAddItems = ref<SelectItem[]>(Array.from({ length: 6 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })));
	function addToMultiple(searchTerm?: string) {
		if (!searchTerm) return;
		const value = { label: searchTerm, value: searchTerm.toLowerCase() };
		multipleAddItems.value.push(value);
		multipleAddValue.value.push(value);
	}
</script>
