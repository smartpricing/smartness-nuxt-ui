<template>
	<ShowcasePage
		title="Phone Input"
		description="The SPhoneInput component provides a phone number input with country code selector, dial code prefix, and automatic mask formatting."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Usage -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic Usage</ProseH3>
			<p class="text-muted">
				Default phone input with US country code pre-selected. Click the flag to search and select a different country.
			</p>

			<div class="flex items-center gap-2">
				<USelect
					v-model="locale"
					:items="['en', 'it', 'de', 'es']"
					value-key="value"
					class="w-48"
				/>
				<UFieldGroup>
					<USelect
						v-model="phone"

						:items="['+393546755432', '3467564565', '+3412345678']"
					/>
					<UButton @click="phone = ''">
						Clear
					</UButton>
				</UFieldGroup>
			</div>

			<div class="w-full">
				<SPhoneInput v-model="phone" class="w-full" :locale="locale" />
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const phone = ref("");
	const locale = ref("en");

	const propsData: PropDefinition[] = [
		{ prop: "v-model", type: "string", description: "Phone number. Accepts prefixed (+393331234567) or plain digits. Emits full number with dial code when country is selected, plain digits otherwise.", default: "\"\"" },
		{ prop: "v-model:countryCode", type: "string", description: "Two-letter ISO country code. Auto-detected from prefixed input, or set manually.", default: "undefined" },
		{ prop: "locale", type: "string", description: "Locale for country name translation (e.g. \"en\", \"it\", \"de\", \"es\")", default: "\"en\"" }
	];
</script>
